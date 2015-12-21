var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Login = React.createFactory(
      require('../../public/react/Login')
    );

module.exports = me = {};

me.render = function(req, res) {
  var out = {greetings: 'Joo'};
  var login = new Login(out);
  var body = ReactDOM.renderToString(login);

  res.render('login', {body: body, reactData: out});
};
