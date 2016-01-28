var React = require('react')
  , ReactDOM = require('react-dom')
  , SingleUser = React.createFactory(require('../react/User/SingleUser'))
  , Users = React.createFactory(require('../react/User'));

module.exports = me = {};

me.render = function() {
  var $container;
  var $rdt = document.querySelector('#rdt');
  var data;

  if (document.querySelector('#user')) {
    $container = document.querySelector('#user');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);

    ReactDOM.render(new SingleUser(data), $container);
  } else if (document.querySelector('#users')) {
    $container = document.querySelector('#users');
    if (!$container || !$rdt) return;

    data = JSON.parse($rdt.innerHTML);

    ReactDOM.render(new Users(data), $container);
  } else {
    return;
  }

}

