var React = require('react')
  , ReactDOM = require('react-dom')
  , Chart = React.createFactory(require('../react/Chart'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#chart');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Chart(data), $container);
}
