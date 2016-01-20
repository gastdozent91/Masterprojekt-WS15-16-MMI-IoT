var chart = require('./chart')
  , login = require('./login')
  , sensor = require('./sensor')
  , users = require('./users')
  , user = require('./user')
  , gateway = require('./gateway')
  , cluster = require('./cluster')
  , dashboard = require('./dashboard');

window.onload = function() {
  login.render();
  chart.render();
  dashboard.render();
  sensor.render();
  users.render();
  user.render();
  gateway.render();
  cluster.render();
};
