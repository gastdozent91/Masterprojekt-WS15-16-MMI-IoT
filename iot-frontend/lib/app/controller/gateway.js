var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Gateway = React.createFactory(
      require('../../public/react/Gateway')
    );

module.exports = me = {};

me.render = function(req, res) {
  var out = {user: req.user.name};
  var gateway = new Gateway(out);
  var body = ReactDOM.renderToStaticMarkup(gateway);

  res.render('gateway', {body: body, reactData: out});
};

