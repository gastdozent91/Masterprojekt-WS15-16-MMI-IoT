var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Model = require('../models/sensor')
  , Sensor = React.createFactory(
      require('../../public/react/Sensor')
    );

module.exports = me = {};

me.getAll = (req, res, next) => {
  Model.getAll(req.user)
  .then(sensors => {
    req.sensors = sensors;
    next();
  })
  .catch(err => {
    res.json(err);
  });
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.id)
  .then(sensor => {
    req.sensors = [sensor];
    next();
    //res.json(users);
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

me.render = function(req, res) {
  var out = {
    user: {firstname: req.user.firstname, isAdmin: req.isAdmin},
    sensors: req.sensors
  };
  var sensor = new Sensor(out);
  var body = ReactDOM.renderToStaticMarkup(sensor);

  res.render('sensor', {body: body, reactData: out});
};
