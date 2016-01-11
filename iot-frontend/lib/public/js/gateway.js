var React = require('react')
  , ReactDOM = require('react-dom')
  , Gateway = React.createFactory(require('../react/Gateway'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#gateway');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Gateway(data), $container);
}

