var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Gateway = React.createFactory(
      require('../../public/react/Gateway')
    );

module.exports = me = {};

me.render = function(req, res) {
  var gateways = [];
  var gateway = {
    name: 'Paul',
    location: 'Berlin',
    active: true
  };
  var gateway2 = {
    name: 'Gerd',
    location: 'Berlin',
    active: false
  };
  var gateway3 = {
    name: 'Michael',
    location: 'Berlin',
    active: true
  };
  gateways.push(gateway);
  gateways.push(gateway2);
  gateways.push(gateway3);
  var out = {
    user: req.user.firstname,
    gateways: gateways
  };
  var gateway = new Gateway(out);
  var body = ReactDOM.renderToStaticMarkup(gateway);

  res.render('gateway', {body: body, reactData: out});
};

