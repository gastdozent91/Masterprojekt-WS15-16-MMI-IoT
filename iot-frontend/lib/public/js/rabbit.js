var Stomp = require('stompjs')
  , SockJS = require('sockjs-client');

module.exports = me = {};

me.connect = function() {
  //var sock = new SockJS('http://localhost:15674/stomp');
  var sock = new SockJS('http://192.168.99.100:15674/stomp');
  var client = Stomp.over(sock);
  client.debug = null
  //client.connect('guest', 'guest', function() {
    //console.log('connect');
    //var subscription = client
                       //.subscribe('/exchange/friss_exch/#', function(msg) {
                         //console.log(msg);


    //});
  //});
  return client;
};

