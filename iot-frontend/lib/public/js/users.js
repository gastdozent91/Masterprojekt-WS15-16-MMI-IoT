var React = require('react')
  , ReactDOM = require('react-dom')
  , Users = React.createFactory(require('../react/Users'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#users');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Users(data), $container);
}

