var React = require('react');

var SingleSensor = React.createClass({

  propTypes: {
    sensor: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      isLive: false
    };
  },

  handleSwitch: function() {
    var isLive = !this.state.isLive;
    console.log('is it live:', isLive);
    this.setState({isLive: isLive});
  },

  render: function() {
    return (
      <div>
        <div style={{textAlign: 'center', marginTop: 20}}>
          <p style={{marginBottom: 0}}>Is it live data?</p>
          <div className="switch large">
            <input className="switch-input"
              id="yes-no"
              type="checkbox"
              onClick={this.handleSwitch}
              name="exampleSwitch"/>
            <label className="switch-paddle" htmlFor="yes-no">
              <span className="show-for-sr"></span>
              <span className="switch-active" aria-hidden="true">Yes</span>
              <span className="switch-inactive" aria-hidden="true">No</span>
            </label>
          </div>
        </div>
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
            <h5>{this.props.sensor.name}</h5>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleSensor;

