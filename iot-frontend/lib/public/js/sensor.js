var React = require('react')
  , ReactDOM = require('react-dom')
  , Sensor = React.createFactory(require('../react/Sensor'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#sensor');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Sensor(data), $container);
}

