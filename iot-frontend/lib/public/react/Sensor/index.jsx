var React = require('react')
  , TopBar = require('../shared/TopBar')
  , SingleSensor = require('./SingleSensor')
  , MultipleSensors = require('./MultipleSensors');

var Sensor = React.createClass({

  propTypes: {
    user: React.PropTypes.string,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    var isMultipleSensors = false;
    if (this.props.sensors.length === 0 || this.props.sensors.length > 1)
      isMultipleSensors = true;

    return {
      isMultipleSensors: isMultipleSensors
    };
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        { this.state.isMultipleSensors ?
          <MultipleSensors sensors={this.props.sensors} />
          :
          <SingleSensor sensor={this.props.sensors[0]} />
        }
      </div>
    );
  }
});

module.exports = Sensor;

