var React = require('react');

var rabbit = require('../js/rabbit');

var Console = React.createClass({

  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount: function() {
    rabbit.setConsoleDiv(document.getElementById('console'));
  },

  render: function() {
    return (
      <div id='console' className='realtime'>
      </div>
    );
  }
});

module.exports = Console;
