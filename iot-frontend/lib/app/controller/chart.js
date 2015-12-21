var React = require('react')
  , ReactDOM = require('react-dom/server')
  , Chart = React.createFactory(
      require('../../public/react/Chart')
    );

module.exports = me = {};

me.render = function(req, res) {
  var out = {greetings: 'Hallo Welten'};
  var chart = new Chart(out);
  var body = ReactDOM.renderToString(chart);

  res.render('index', {body: body, reactData: out});
};
