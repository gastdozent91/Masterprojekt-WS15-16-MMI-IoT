var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Model = require('../models/sensor')
  , User = require('./user')
  , UserModel = require('../models/user')
  , Sensor = React.createFactory(
      require('../../public/react/Sensor')
    )
  , SingleSensor = React.createFactory(
      require('../../public/react/Sensor/SingleSensor')
    );

module.exports = me = {};

me.getAll = (req, res, next) => {
  if (User.isAdmin(req.user)) {
    Model.getAll(req.user)
    .then(sensors => {
      req.sensors = sensors;
      next();
    })
    .catch(err => {
      res.json(err);
    });
  } else {
    next();
  }
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.id)
  .then(sensor => {
    req.sensor = sensor;
    next();
  })
  .catch(err => {
    res.json(err);
  });
};

me.create = (req, res, next) => {
  Model.create(req.user, req.body)
  .then(result => {
    res.json(result.status);
  })
  .catch(err => {
    res.json(err.status);
  });
};

me.update = (req, res, next) => {
  var changedSensor = req.body;
  Model.update(req.user, changedSensor, (err, result) => {
    if (err) res.json(err);
    console.log(result);
    res.json(result);
  });
};

me.delete = (req, res, next) => {
  var sensorToDelete = req.params.id;
  Model.delete(req.user, sensorToDelete)
  .then(result => {
    res.json(result.status);
  })
  .catch(err => {
    res.json(err);
  });
};

me.sendJson = function(req, res) {
  res.json(req.sensors);
};

me.render = function(req, res) {
  var out
    , body;
  if (req.sensor) {
    console.log('single sensor');
    out = {
      user: {firstname: req.user.firstname, isAdmin: req.isAdmin},
      sensor: req.sensor
    };
    var sensor = new SingleSensor(out);
    body = ReactDOM.renderToStaticMarkup(sensor);

    res.render('sensor', {body: body, reactData: out});
  } else {
    console.log('multi sensor');
    out = {
      user: {firstname: req.user.firstname, isAdmin: req.isAdmin},
      sensors: req.sensors
    };
    var sensors = new Sensor(out);
    body = ReactDOM.renderToStaticMarkup(sensors);

    res.render('sensors', {body: body, reactData: out});
  }
};
