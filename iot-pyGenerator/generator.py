import struct
import json
import sys
import datetime
import random
import pika
import time
from math import floor
import pytz
from optparse import OptionParser

__author__ = 'Elias Lerch'

# 0.1 = 10% variance in bulk size
rabbitmqConnection = 0
rabbitmqchannel = 0

MAJOR_VERSION = 0
MINOR_VERSION = 1

# Mapping of sensor numbers to ids
sensor_id = {
    0: "BeinRechts",
    1: "ArmRechts",
    2: "ArmLinks",
    3: "BeinLinks",
    4: "Ruecken",
    5: "Schulter",
    6: "Kopf"
}

# These values must currently be set
# They will be provided by the gateway at a later stage
recording_date = datetime.datetime(2016, 1, 18, 18, 0)
recording_location = "Europe/Berlin"
recording_timezone = pytz.timezone(recording_location)


# Reads sample packets from binary trace format
def packets_from_file(filename, recording_time, chunksize=102):
    with open(filename, "rb") as f:
        while True:
            chunk = f.read(chunksize)
            if chunk:
                sensor_time = datetime.timedelta(milliseconds=struct.unpack("<I", chunk[:4])[0])  # ms since start of capturing system
                fused_time = recording_time + sensor_time
                packet = {
                    'timestamp': fused_time,
                    'data': {}
                }
                counter = 0
                for qw, qx, qy, qz, ax, ay, az in struct.iter_unpack("<hhhhhhh", chunk[4:]):
                    scale_q = (1.0 / (1 << 14))
                    scale_a = 1.0 / 100
                    packet['data'][sensor_id[counter]] = {
                        # Decode Quaternion: Orientation data (unit-less)
                        'orientation': [round(scale_q * qw, 6),
                                        round(scale_q * qx, 6),
                                        round(scale_q * qy, 6),
                                        round(scale_q * qz, 6)],
                        # Decode Vector: Acceleration data (m/s^2)
                        'acceleration': [round(scale_a * ax, 2),
                                         round(scale_a * ay, 2),
                                         round(scale_a * az, 2)]
                    }
                    counter += 1
                yield packet
            else:
                break


# Re-format the data into single sensor samples
# Each sample has a timestamp and an id, optionally combinations of orientation, acceleration and location
def formatData():
    result = []
    i = 0
    for sample in sampleTuple:
        if options.verbose:
            print('\r{}/{}'.format(i, len(sampleTuple)), end='\r')
            i += 1
            sys.stdout.flush()
        ts = sample['timestamp']
        for SensorId in sample['data'].keys():
            data = sample['data'][SensorId]
            result.append({
                'id': SensorId,
                # TODO: ISO 8601 need; id + time => must be unique
                'time': recording_timezone.localize(ts).strftime('%Y-%m-%dT%H:%M:%S'),
                #'time': datetime.datetime.fromtimestamp(random.randint(0, 1454005235)).strftime('%Y-%m-%dT%H:%M:%S'), quick fix to make id + time hopefully unique
                'acceleration': data['acceleration'],
                'orientation': data['orientation'],
                'location': recording_location
            })
    return result


def getBulkLen():
    minSize = floor(options.bulksize - options.bulksize * options.bulkvar)
    maxSize = floor(options.bulksize + options.bulksize * options.bulkvar)
    return random.randrange(minSize, maxSize)


def sendBulk(sensorDataBulk, optionsMap):
    if optionsMap.simulated:
        print("sending bulk of data, sensorValues: {}".format(len(sensorDataBulk)))
    else:
        print("sending bulk of data, sensorValues: {}".format(len(sensorDataBulk)))

        rabbitmqchannel.basic_publish(optionsMap.exchange,
                                      "", # TODO: routing_key is sensor_id
                                      json.dumps(sensorDataBulk),
                                      pika.BasicProperties(content_type="text/plain", delivery_mode=1))

if __name__ == '__main__':

    # Parse options
    parser = OptionParser(usage="usage: %prog [options] infile",
                          version="%prog v{}.{}".format(MAJOR_VERSION, MINOR_VERSION))
    parser.add_option("-b", "--bulksize", action="store", dest="bulksize", type="int", default=100,
                      help="Amount of data samples per bulk, default: 100")
    parser.add_option("-s", action="store_true", dest="simulated",
                      help="Scan data, simulating send, print statistics of generated bulks and exit")
    parser.add_option("-l", action="store_true", dest="loop",
                      help="loops the available data endlessly")
    parser.add_option("-v", "--verbose", action="store_true", dest="verbose",
                      help="Print progress information")
    parser.add_option("--variance", action="store", dest="bulkvar", type="float", default=0.1,
                      help="Variance of bulksize in percent, default: 0.1")
    parser.add_option("--rabbitIP", action="store", dest="ip", type="string", default="192.168.99.100",
                      help="ip adress of rabbitmq, default: 192.168.99.100")
    parser.add_option("--exchange", action="store", dest="exchange", type="string", default="friss_exch",
                      help="name of target rabbitmq exchange, default: friss_exch")
    parser.add_option("--sleeptime", action="store", dest="sleeptime", type="float", default=1,
                      help="timeinterval between bulks, default: 1 second")

    (options, args) = parser.parse_args()

    # Check mandatory argument
    if len(args) != 1:
        parser.print_help()
        sys.exit(1)
    data_file = args[0]

    # Read binary file
    if options.verbose:
        print("Reading json file: {}".format(data_file))

    sampleTuple = []
    for p in packets_from_file(data_file, recording_date):
        sampleTuple.append(p)

    # Format & split sample data in single sensor readings
    if options.verbose:
        print("Splitting data")
    output = formatData()

    # Write out result as UTF_8 JSON
    if options.verbose:
        print("got {} samples in file".format(len(output)))
    if not options.simulated:
        try:
            rabbitmqConnection = pika.BlockingConnection(pika.ConnectionParameters(options.ip))
        except:
            print("Couldn't connect to rabbitmq server, aborting. Try option '--rabbitIP'")
            exit()
        rabbitmqchannel = rabbitmqConnection.channel()
        rabbitmqchannel.queue_declare(queue=options.exchange) # TODO: ?, we don't need queues

    # make bulks but dont send them
    c = 1
    dataIndex = 0
    while dataIndex < len(output):
        bulkDataAmount = getBulkLen()
        if dataIndex + bulkDataAmount > len(output):
            bulkDataAmount = len(output)-dataIndex
        sendBulk(output[dataIndex:(dataIndex + bulkDataAmount)],
                 options)
        dataIndex += bulkDataAmount
        time.sleep(options.sleeptime)
        if options.loop and dataIndex >= len(output):
            print("looping data")
            dataIndex = 0
    rabbitmqConnection.close()
