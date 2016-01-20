var request = require('superagent')
  , Promise = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = 'http://localhost:8080/iot-friss';
