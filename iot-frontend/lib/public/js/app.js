var chart = require('./chart')
  , login = require('./login')
  , sensor = require('./sensor')
  , user = require('./user')
  , gateway = require('./gateway')
  , cluster = require('./cluster')
  , footer = require('./footer')
  , dashboard = require('./dashboard');

window.onload = function() {
  login.render();
  chart.render();
  dashboard.render();
  sensor.render();
  user.render();
  gateway.render();
  cluster.render();
  footer.render();
};
