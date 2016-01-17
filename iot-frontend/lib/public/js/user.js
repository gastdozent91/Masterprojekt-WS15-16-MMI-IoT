var React = require('react')
  , ReactDOM = require('react-dom')
  , User = React.createFactory(require('../react/User'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#user');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new User(data), $container);
}

