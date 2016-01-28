var React = require('react')
  , ReactDOM = require('react-dom')
  , Cluster = React.createFactory(require('../react/Cluster'))
  , SingleCluster = React.createFactory(
      require('../react/Cluster/SingleCluster')
  );

module.exports = me = {};

me.render = function() {
  var $container;
  var $rdt = document.querySelector('#rdt');
  var data;

  if (document.querySelector('#cluster')) {
    $container = document.querySelector('#cluster');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);
    ReactDOM.render(new SingleCluster(data), $container);
  } else if (document.querySelector('#clusters')) {
    $container = document.querySelector('#clusters');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);
    ReactDOM.render(new Cluster(data), $container);
  } else {
    return;
  }
}

