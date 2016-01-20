var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Model = require('../models/cluster')
  , Cluster = React.createFactory(
      require('../../public/react/Cluster')
    );

module.exports = me = {};

me.getAll = (req, res, next) => {
  Model.getAll(req.user)
  .then(clusters => {
    req.clusters = clusters;
    next();
  })
  .catch(err => {
    res.json(err);
  });
};

me.render = function(req, res) {
  var out = {
    user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
    clusters: req.clusters
  };
  var cluster = new Cluster(out);
  var body = ReactDOM.renderToStaticMarkup(cluster);

  res.render('cluster', {body: body, reactData: out});
};

