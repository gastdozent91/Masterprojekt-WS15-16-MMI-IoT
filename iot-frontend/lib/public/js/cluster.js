var React = require('react')
  , ReactDOM = require('react-dom')
  , Cluster = React.createFactory(require('../react/Cluster'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#cluster');
  var $rdt = document.querySelector('#rdt');
  if (!$container || !$rdt) return;

  var data = JSON.parse($rdt.innerHTML);

  ReactDOM.render(new Cluster(data), $container);
}

