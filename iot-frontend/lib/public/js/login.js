var React = require('react')
  , ReactDOM = require('react-dom')
  , Login = React.createFactory(require('../react/Login'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#login');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Login(data), $container);
}

