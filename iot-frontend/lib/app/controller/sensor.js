var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Sensor = React.createFactory(
      require('../../public/react/Sensor')
    );

module.exports = me = {};

me.render = function(req, res) {
  var sensors = [];
  var sensor = {
    name: 'gyrosensor',
    location: 'Berlin',
    active: true,
    type: 'gyro',
    gateway: 'supergateway'
  };
  var sensor2 = {
    name: 'accelerationsensor',
    location: 'Berlin',
    active: false,
    type: 'acceleration',
    gateway: 'supergateway'
  };
  var sensor3 = {
    name: 'accelerationsensor',
    location: 'Berlin',
    active: true,
    type: 'acceleration',
    gateway: 'dupergateway'
  };
  sensors.push(sensor);
  if (req.query && req.query.size !== '1') {
    sensors.push(sensor2);
    sensors.push(sensor3);
  }
  var out = {
    user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
    sensors: sensors
  };
  var sensor = new Sensor(out);
  var body = ReactDOM.renderToStaticMarkup(sensor);

  res.render('sensor', {body: body, reactData: out});
};
