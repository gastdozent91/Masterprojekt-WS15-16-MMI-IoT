var React = require('react')
  , ReactDOM = require('react-dom')
  , Sensor = React.createFactory(require('../react/Sensor'))
  , SingleSensor = React.createFactory(
      require('../react/Sensor/SingleSensor')
  );

module.exports = me = {};

me.render = function() {
  var $container;
  var $rdt = document.querySelector('#rdt');
  var data;

  if (document.querySelector('#sensor')) {
    $container = document.querySelector('#sensor');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);
    ReactDOM.render(new SingleSensor(data), $container);
  } else if (document.querySelector('#sensors')) {
    $container = document.querySelector('#sensors');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);
    ReactDOM.render(new Sensor(data), $container);
  } else {
    return;
  }
}

