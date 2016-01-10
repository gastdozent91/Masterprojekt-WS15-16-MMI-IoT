var chart = require('./chart')
  , login = require('./login')
  , sensor = require('./sensor')
  , gateway = require('./gateway')
  , dashboard = require('./dashboard');

window.onload = function() {
  login.render();
  chart.render();
  dashboard.render();
  sensor.render();
  gateway.render();
};
