var Stomp = require('stompjs')
  , SockJS = require('sockjs-client');

module.exports = me = {};

var test = [];
var testData = [];
var consoleDiv;
var consoleData = [];

me.connect = function() {
  //var sock = new SockJS('http://localhost:15674/stomp');
  var sock = new SockJS('http://192.168.99.100:15674/stomp');
  var client = Stomp.over(sock);
  client.debug = null
  client.connect('guest', 'guest', function() {
    console.log('connect');
    var subscription = client
                       .subscribe('/exchange/friss_exch/#', function(msg) {

      var obj = {
        time: new Date(),
        value: JSON.parse(msg.body).values.length,
        color: colorMap[msg.headers.sensor_type]
      };

      if (!test.length) {
        test.push(msg.headers.sensor_type);
        testData.push([obj]);
      } else {
        if (test.indexOf(msg.headers.sensor_type) > -1) {
          testData[test.indexOf(msg.headers.sensor_type)].push(obj);
        } else {
          test.push(msg.headers.sensor_type);
          testData.push([obj]);
        }
      }

      testData.forEach(function(t) {
        if (t.length > 10)
          t.splice(0, 1);
      });


      var date = obj.time.toTimeString();
      var reg = /\d{2}:\d{2}:\d{2}/;

      var line1 = '[' + reg.exec(date) + '] Gateway: '
                + JSON.parse(msg.body).gateway_name
                + ' - Sensor Type: ';
      var line2 = msg.headers.sensor_type;

      var span1 = document.createElement('span');
      span1.innerHTML = line1;
      var span2 = document.createElement('span');
      span2.innerHTML = line2;
      span2.style.color = obj.color;
      var newDiv = document.createElement('div');
      newDiv.className = 'conole-line';

      newDiv.appendChild(span1);
      newDiv.appendChild(span2);
      consoleDiv.appendChild(newDiv);
      consoleDiv.scrollTop = consoleDiv.scrollHeight;

      if (consoleDiv.childElementCount > 40)
        consoleDiv.removeChild(consoleDiv.childNodes[0]);

    });
  });
};

var colorMap = {
  scalar: 'steelblue',
  orientation: 'red',
  location: 'green',
  acceleration: 'orange'
};

me.getTest = function() {
  return testData;
};

me.setConsoleDiv = function(t) {
  consoleDiv = t;
};
