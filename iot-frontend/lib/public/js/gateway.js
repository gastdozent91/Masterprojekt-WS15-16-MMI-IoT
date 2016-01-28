var React = require('react')
  , ReactDOM = require('react-dom')
  , Gateway = React.createFactory(require('../react/Gateway'))
  , SingleGateway = React.createFactory(
      require('../react/Gateway/SingleGateway')
  );

module.exports = me = {};

me.render = function() {
  var $container;
  var $rdt = document.querySelector('#rdt');
  var data;

  if (document.querySelector('#gateway')) {
    $container = document.querySelector('#gateway');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);
    ReactDOM.render(new SingleGateway(data), $container);
  } else if (document.querySelector('#gateways')) {
    $container = document.querySelector('#gateways');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);
    ReactDOM.render(new Gateway(data), $container);
  } else {
    return;
  }
}

