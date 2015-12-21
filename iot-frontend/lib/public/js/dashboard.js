var React = require('react')
  , ReactDOM = require('react-dom')
  , Dashboard = React.createFactory(require('../react/Dashboard'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#dashboard');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Dashboard(data), $container);
}

