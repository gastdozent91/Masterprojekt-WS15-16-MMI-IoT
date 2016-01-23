var React = require('react')
  , ReactDOM = require('react-dom')
  , SingleUser = React.createFactory(require('../react/User/SingleUser'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#user');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new SingleUser(data), $container);
}

