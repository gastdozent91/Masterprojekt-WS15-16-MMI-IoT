var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Model = require('../models/cluster')
  , SingleCluster = React.createFactory(
      require('../../public/react/Cluster/SingleCluster')
    )
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

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.id)
  .then(cluster => {
    req.cluster = cluster;
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

me.render = function(req, res) {
  var out
    , body;
  if (req.cluster) {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      cluster: req.cluster
    };
    var cluster = new SingleCluster(out);
    body = ReactDOM.renderToStaticMarkup(cluster);

    res.render('cluster', {body: body, reactData: out});
  } else {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      clusters: req.clusters
    };
    var clusters = new Cluster(out);
    body = ReactDOM.renderToStaticMarkup(clusters);

    res.render('clusters', {body: body, reactData: out});
  }
};

