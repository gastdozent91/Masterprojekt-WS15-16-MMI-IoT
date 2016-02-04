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
    console.log(users);
    req.users = users;
    next();
    //res.json(users);
  })
  .catch(err => {
    res.json(err);
  });
};

me.getOne = (req, res, next) => {
  Model.getOne(req.user, req.params.username)
  .then(user => {
    req.userToCheck = user;
    next();
    //res.json(users);
  })
  .catch(err => {
    res.json(err);
  });
};

me.update = (req, res, next) => {
  var changedUser = req.user;
  changedUser.firstname = 'Ray';
  changedUser.roles = req.user.roles.values;
  Model.update(req.user, changedUser, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};

me.delete = (req, res, next) => {
  var userToDelete = 'ray';
  Model.delete(req.user, userToDelete)
  .then(result => {
    res.json(result.status);
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

me.getSensors = (req, res, next) => {
  if (isAdmin(req.user)) next();
  var userWithSensors = req.user.username;
  Model.getSensors(req.user, userWithSensors)
  .then(result => {
    req.sensors = result.body;
    next();
  })
  .catch(err => {
    res.json(err);
  });
};

me.setSensors = (req, res, next) => {
  var userWithSensors = 'max';
  var sensors = [];
  Model.setSensors(req.user, userWithSensors, sensors)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
};

me.render = (req, res) => {
  var out
    , body;
  if (req.userToCheck) {
    out = {
      user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
      userToCheck: req.userToCheck
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
