var User = require('../models/user');

module.exports = me = {};

me.getAll = (req, res, next) => {
  User.getAllUser(req.user, (err, result) => {
    if (err) res.json(err);
    res.json(result.body);
  });
};

me.update = (req, res, next) => {
  var changedUser = req.user;
  changedUser.firstname = 'Ray';
  changedUser.roles = req.user.roles.values;
  User.update(req.user, changedUser, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};

me.delete = (req, res, next) => {
  var userToDelete = 'max';
  User.delete(req.user, userToDelete, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};

me.create = (req, res, next) => {
  var userToCreate = {
    firstname: 'Ray',
    lastname: 'Glaeske',
    username: 'ray',
    password: 'LOL',
    roles: ['ROLE_ADMIN']
  };
  User.create(req.user, userToCreate, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};

me.getSensors = (req, res, next) => {
  var userWithSensors = 'max';
  User.getSensors(req.user, userWithSensors, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};

me.setSensors = (req, res, next) => {
  var userWithSensors = 'max';
  var sensors = [];
  User.setSensors(req.user, userWithSensors, sensors, (err, result) => {
    if (err) res.json(err);
    res.json(result);
  });
};
