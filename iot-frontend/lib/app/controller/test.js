var User = require('../models/user');

module.exports = me = {};

me.createTable = function(req, res) {
  User.createTable('Users', function(err, data) {
    if (err) res.json(err);
    res.json(data);
  });
};

me.getUser = function(req, res) {
  User.find('Guest', function(err, data) {
    if (err) res.json(err);
    res.json(data);
  });
};
