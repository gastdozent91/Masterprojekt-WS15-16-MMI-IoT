var chart = require('./chart')
  , login = require('./login')
  , dashboard = require('./dashboard');

window.onload = function() {
  login.render();
  chart.render();
  dashboard.render();
};
