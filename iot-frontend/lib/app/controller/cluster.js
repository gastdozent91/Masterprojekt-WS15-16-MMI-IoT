var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Cluster = React.createFactory(
      require('../../public/react/Cluster')
    );

module.exports = me = {};

me.render = function(req, res) {
  var out = {
    user: { firstname: req.user.firstname, isAdmin: req.isAdmin},
  };
  var cluster = new Cluster(out);
  var body = ReactDOM.renderToStaticMarkup(cluster);

  res.render('cluster', {body: body, reactData: out});
};

