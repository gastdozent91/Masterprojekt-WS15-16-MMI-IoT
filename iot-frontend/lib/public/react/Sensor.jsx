var React = require('react')
  , TopBar = require('./shared/TopBar');

var Sensor = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
      </div>
    );
  }
});

module.exports = Sensor;

