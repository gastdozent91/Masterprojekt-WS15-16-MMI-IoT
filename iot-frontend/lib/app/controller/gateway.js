var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Model = require('../models/gateway')
  , Gateway = React.createFactory(
      require('../../public/react/Gateway')
    );

module.exports = me = {};

me.getAll = (req, res, next) => {
  Model.getAll(req.user)
  .then(gateways => {
    req.gateways = gateways;
    next();
  })
  .catch(err => {
    res.json(err);
  });
};

me.render = function(req, res) {
  var out = {
    user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
    gateways: req.gateways
  };
  var gateway = new Gateway(out);
  var body = ReactDOM.renderToStaticMarkup(gateway);

  res.render('gateway', {body: body, reactData: out});
};

