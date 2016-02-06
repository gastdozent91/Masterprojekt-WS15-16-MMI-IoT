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
  Model.getAll(req.user)
  .then(sensors => {
    req.sensors = sensors;
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.id)
  .then(sensor => {
    req.sensor = sensor;
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.create = (req, res, next) => {
  Model.create(req.user, req.body)
  .then(result => {
    return res.json(result.status);
  })
  .catch(err => {
    return res.json(err.status);
  });
};

me.update = (req, res, next) => {
  Model.update(req.user, req.params.id, req.body)
  .then(result => {
    if (err) res.json(err);
    return res.json(result);
  })
  .catch(err => {
   return res.json(err.status);
  });
};

me.delete = (req, res, next) => {
  Model.delete(req.user, req.params.id)
  .then(result => {
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
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
