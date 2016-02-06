var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Model = require('../models/gateway')
  , SingleGateway = React.createFactory(
      require('../../public/react/Gateway/SingleGateway')
    )
  , Gateway = React.createFactory(
      require('../../public/react/Gateway')
    );

module.exports = me = {};

me.getAll = (req, res, next) => {
  Model.getAll(req.user)
  .then(gateways => {
    req.gateways = gateways;
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.getSensors = (req, res, next) => {
  Model.getSensors(req.user, req.gateway.id)
  .then(sensors => {
    req.sensors = sensors;
    console.log('sensors', sensors);
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.id)
  .then(gateway => {
    req.gateway = gateway;
    return next();
  })
  .catch(err => {
   return  res.json(err);
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

me.delete = (req, res, next) => {
  var gatewayToDelete = req.params.id;
  Model.delete(req.user, gatewayToDelete)
  .then(result => {
    return res.json(result.status);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.update = (req, res, next) => {
  var changedGateway = req.body;
  Model.update(req.user, changedGateway)
  .then(resutl => {
    if (err) res.json(err);
    console.log(result);
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.sendJson = function(req, res) {
  res.json(req.gateways);
};

me.render = function(req, res) {
  var out
    , body;
  if (req.gateway) {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      gateway: req.gateway,
      sensors: req.sensors
    };
    var gateway = new SingleGateway(out);
    body = ReactDOM.renderToStaticMarkup(gateway);
    res.render('gateway', {body: body, reactData: out});
  } else {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      gateways: req.gateways
    };
    var gateways = new Gateway(out);
    body = ReactDOM.renderToStaticMarkup(gateways);
    res.render('gateways', {body: body, reactData: out});
  }
};

