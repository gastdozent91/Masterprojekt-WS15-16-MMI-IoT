var React = require('react')
  , ReactDOM = require('react-dom')
  , Footer = React.createFactory(require('../react/shared/Footer'));

module.exports = me = {};

me.render = function() {
  var $container = document.querySelector('#footer');
  if (!$container) return;

  ReactDOM.render(new Footer(), $container);
}

