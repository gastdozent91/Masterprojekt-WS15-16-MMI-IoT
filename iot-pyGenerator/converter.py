import struct
import json
import sys
import datetime
from math import floor
import pytz
from optparse import OptionParser

__author__ = 'ehoefig'
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
                'time': recording_timezone.localize(ts).strftime('%Y-%m-%d %H:%M:%S.%f %Z'),
                'acceleration': data['acceleration'],
                'orientation': data['orientation'],
                'location': recording_location
            })
    return result


# scan data and dump some timing statistics
def dumpTimingInformation():
    counter = 0
    minTime = datetime.timedelta(days=999999999)
    maxTime = datetime.timedelta()
    duration = datetime.timedelta()
    old_timestamp = datetime.datetime(1970, 1, 2, 0, 0)
    for p in sampleTuple:
        timestamp = p['timestamp']
        if old_timestamp > datetime.datetime(1970, 1, 2, 0, 0):
            diff = timestamp - old_timestamp
            if diff < minTime:
                minTime = diff
            if diff > maxTime:
                maxTime = diff
            duration += diff
            counter += 1
        old_timestamp = timestamp
    avg = duration / counter
    hours, remainder = divmod(duration.total_seconds(), 3600)
    minutes, seconds = divmod(remainder, 60)
    print('Got {} tuples ({} samples) within a {}:{}s duration'.format(len(sampleTuple), len(sampleTuple)*7,
                                                                       floor(minutes), floor(seconds)))
    print("Average time between sample tuples: {:.2f}ms (varies between {:.0f}ms .. {:.0f}ms)".format(
            avg.microseconds / 1000, minTime.microseconds / 1000, maxTime.microseconds / 1000))


if __name__ == '__main__':

    # Parse options
    parser = OptionParser(usage="usage: %prog [options] file",
                          version="%prog v{}.{}".format(MAJOR_VERSION, MINOR_VERSION))
    parser.add_option("-o", "--output", help="write output to FILE", metavar="FILE", type="string", dest="filename")
    parser.add_option("-s", help="Scan data, print timing statistics and exit", action="store_true", dest="statistics")
    parser.add_option("-v", help="Print progress information", action="store_true", dest="verbose")
    (options, args) = parser.parse_args()

    # Check mandatory argument
    if len(args) != 1:
        parser.print_help()
        sys.exit(1)
    data_file = args[0]

    # Read binary file
    if options.verbose:
        print("Reading trace file {}".format(data_file))

    sampleTuple = []
    for p in packets_from_file(data_file, recording_date):
        sampleTuple.append(p)

    if options.statistics:
        dumpTimingInformation()
        sys.exit(0)

    # Format & split sample data in single sensor readings
    if options.verbose:
        print("Splitting data")
    output = formatData()

    # Write out result as UTF_8 JSON
    if options.verbose:
        print("Dumping JSON")
    if options.filename:
        # use output file
        c = 1
        i = 0
        with open(options.filename, "w") as f:
            f.write("[\n")
            for s in output:
                if options.verbose:
                    print('\r{}/{}'.format(i, len(output)), end='\r')
                    i += 1
                    sys.stdout.flush()
                json.dump(s, f, ensure_ascii=False)
                if c < len(output):
                    f.write(",\n")
                c += 1
            f.write("\n]\n")
    else:
        # use stdout
        print(json.dumps(output, sort_keys=True, indent=4))


