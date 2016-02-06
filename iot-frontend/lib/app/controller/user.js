var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Users = React.createFactory(require('../../public/react/User'))
  , SingleUser = React.createFactory(require('../../public/react/User/SingleUser'))
  , Model = require('../models/user');

module.exports = me = {};

me.isAdmin = function(user) {
  return isAdmin(user);
};

var isAdmin = function(user) {
  return user.roles.values.indexOf('ROLE_ADMIN') > -1;
};

me.getAll = (req, res, next) => {
  Model.getAll(req.user)
  .then(users => {
    req.users = users;
    return next();
    //res.json(users);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.username)
  .then(user => {
    req.userToCheck = user;
    return next();
    //res.json(users);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.update = (req, res, next) => {
  Model.update(req.user, req.params.username, req.body)
  .then(result => {
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.delete = (req, res, next) => {
  Model.delete(req.user, req.params.username)
  .then(result => {
    return res.json(result);
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

me.getSensors = (req, res, next) => {
  Model.getSensors(req.user, req.userToCheck)
  .then(result => {
    req.sensors = result.body;
    return next();
  })
  .catch(err => {
    return res.json(err);
  });
};

me.setSensors = (req, res, next) => {
  var userWithSensors = 'max';
  var sensors = [];
  Model.setSensors(req.user, userWithSensors, sensors)
  .then(result => {
    return res.json(result);
  })
  .catch(err => {
    return res.json(err);
  });
};

me.render = (req, res) => {
  var out
    , body;
  if (req.userToCheck) {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      userToCheck: req.userToCheck,
      sensors: req.sensors || []
    };
    var user = new SingleUser(out);
    body = ReactDOM.renderToStaticMarkup(user);
    res.render('user', {body: body, reactData: out});
  } else {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      users: req.users
    };
    var users = new Users(out);
    body = ReactDOM.renderToStaticMarkup(users);
    res.render('users', {body: body, reactData: out});
  }
};
