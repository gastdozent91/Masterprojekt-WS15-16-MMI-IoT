var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Login = React.createFactory(
      require('../../public/react/Login')
    );

module.exports = me = {};

me.shouldBeLoggedIn = function(req, res, next) {
  if (!req.user) res.redirect('/login');
  else {
    req.isAdmin = req.user.roles.values.indexOf('ROLE_ADMIN') > -1;
    next();
  }
};

me.isAlreadyLoggedIn = function(req, res, next) {
  if (req.user) res.redirect('/');
  else next();
};

me.logout = function(req, res, next) {
  req.session.destroy();
  res.redirect('/login');
};

me.render = function(req, res) {
  var out = {greetings: 'Joo'};
  var login = new Login(out);
  var body = ReactDOM.renderToStaticMarkup(login);

  res.render('login', {body: body, reactData: out});
};
