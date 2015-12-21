var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Dashboard = React.createFactory(
      require('../../public/react/Dashboard')
    );

module.exports = me = {};

me.render = function(req, res) {
  var out = {user: req.user.name};
  var dashboard = new Dashboard(out);
  var body = ReactDOM.renderToString(dashboard);

  res.render('dashboard', {body: body, reactData: out});
};
