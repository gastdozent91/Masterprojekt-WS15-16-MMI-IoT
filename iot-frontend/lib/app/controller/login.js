var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Login = React.createFactory(
      require('../../public/react/Login')
    );

module.exports = me = {};

me.shouldBeLoggedIn = function(req, res, next) {
  if (!req.user) res.redirect('/login');
  else next();
};

me.isAlreadyLoggedIn = function(req, res, next) {
  if (req.user) res.redirect('/');
  else next();
};

me.render = function(req, res) {
  var out = {greetings: 'Joo'};
  var login = new Login(out);
  var body = ReactDOM.renderToStaticMarkup(login);

  res.render('login', {body: body, reactData: out});
};
