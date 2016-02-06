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
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.id)
  .then(cluster => {
    req.cluster = cluster;
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.getSensors = (req, res, next) => {
  Model.getSensors(req.user, req.cluster.id)
  .then(sensors => {
    req.sensors = sensors;
    //delete req.cluster.sensorList;
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.create = (req, res, next) => {
  Model.create(req.user, req.body)
  .then(result => {
    return res.json(result);
  })
  .catch(err => {
    return res.json(err.status);
  });
};

me.delete = (req, res, next) => {
  Model.delete(req.user, req.params.id)
  .then(result => {
    return res.json(result.status);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.update = (req, res, next) => {
  Model.update(req.user, req.params.id, req.body)
  .then(result => {
    if (err) res.json(err);
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.sendJson = function(req, res) {
  res.json(req.clusters);
};

me.render = function(req, res) {
  var out
    , body;
  if (req.cluster) {
    out = {
      user: {
        firstname: req.user.firstname,
        username: req.user.username,
        isAdmin: req.isAdmin
      },
      cluster: req.cluster,
      sensors: req.sensors
    };
    var cluster = new SingleCluster(out);
    body = ReactDOM.renderToStaticMarkup(cluster);

    res.render('cluster', {body: body, reactData: out});
  } else {
    out = {
      user: {
        firstname: req.user.firstname,
        username: req.user.username,
        isAdmin: req.isAdmin
      },
      clusters: req.clusters
    };
    var clusters = new Cluster(out);
    body = ReactDOM.renderToStaticMarkup(clusters);

    res.render('clusters', {body: body, reactData: out});
  }
};

