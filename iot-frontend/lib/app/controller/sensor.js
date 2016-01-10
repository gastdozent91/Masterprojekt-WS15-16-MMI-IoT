var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Sensor = React.createFactory(
      require('../../public/react/Sensor')
    );

module.exports = me = {};

me.render = function(req, res) {
  var out = {user: req.user.name};
  var sensor = new Sensor(out);
  var body = ReactDOM.renderToStaticMarkup(sensor);

  res.render('sensor', {body: body, reactData: out});
};
