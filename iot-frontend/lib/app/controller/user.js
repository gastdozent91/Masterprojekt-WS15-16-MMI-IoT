var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Users = React.createFactory(require('../../public/react/User'))
  , SingleUser = React.createFactory(require('../../public/react/User/SingleUser'))
  , Model = require('../models/user');

module.exports = me = {};

me.getAll = (req, res, next) => {
  Model.getAll(req.user)
  .then(users => {
    users.forEach(user => {
      user.sensorCount = user.sensorList.length;
      delete user.sensorList;
    });
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
  var userToDelete = 'max';
  Model.delete(req.user, userToDelete)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
  //User.delete(req.user, userToDelete, (err, result) => {
    //if (err) res.json(err);
    //res.json(result);
  //});
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
  var userWithSensors = 'max';
  Model.getSensors(req.user, userWithSensors)
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    res.json(err);
  });
  //User.getSensors(req.user, userWithSensors, (err, result) => {
    //if (err) res.json(err);
    //res.json(result);
  //});
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
  //User.setSensors(req.user, userWithSensors, sensors, (err, result) => {
    //if (err) res.json(err);
    //res.json(result);
  //});
};

me.renderUser = (req, res) => {
  var out = {
    user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
    userToCheck: req.userToCheck
  };
  var user = new SingleUser(out);
  var body = ReactDOM.renderToStaticMarkup(user);
  res.render('user', {body: body, reactData: out});
};

me.renderUsers = (req, res) => {
  var out = {
    user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
    users: req.users
  };
  var users = new Users(out);
  var body = ReactDOM.renderToStaticMarkup(users);
  res.render('users', {body: body, reactData: out});

};
