#!/usr/bin/python

# Copyright (c) 2014 Roger Light <roger@atchoo.org>
#
# All rights reserved. This program and the accompanying materials
# are made available under the terms of the Eclipse Distribution License v1.0
# which accompanies this distribution. 
#
# The Eclipse Distribution License is available at 
#   http://www.eclipse.org/org/documents/edl-v10.php.
#
# Contributors:
#    Roger Light - initial implementation

# This shows an example of using the publish.multiple helper function.

import sys
try:
    import paho.mqtt.publish as publish
    import argparse
    import random
except ImportError:
    print("please install paho via pip!")

def args_parser():
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('-mc', default=10000,
                        help='messages in bulk')
    parser.add_argument('-topic', default='iot/testing',
                        help='topic of each message')
    parser.add_argument('-debug', action='store_true')
    args = parser.parse_args()
    return vars(args)

def generateBulk(topic):
    #msg = {'topic':"<topic>", 'payload':"<payload>", 'qos':<qos>, 'retain':<retain>}
    msgs = [{'topic':topic, 'payload':"multiple 1"}, ("paho/test/multiple", "multiple 2", 0, False)]
    return msgs


# --------- main start ---------
arg_list = args_parser()
for i in range(0, arg_list.get('mc')):
    msgs= generateBulk("iot/testing")
    publish.multiple(msgs, hostname="test.mosquitto.org")

