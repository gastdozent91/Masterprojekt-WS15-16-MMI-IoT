module.exports = me = {};

me.allUsers = function(req, res){
  res.send("allUsers");
};

me.registerUser = function(req, res){
  res.send("registerUser");
};

me.loginUser = function(req, res){
  res.send("loginUser");
};

me.deleteUser = function(req, res){
  res.send("deleteUser");
};

me.changeUserRole = function(req, res){
  res.send("id: "+req.params.id+"\n new role: "+req.params.role);
};