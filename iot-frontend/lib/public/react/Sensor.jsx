var React = require('react')
  , TopBar = require('./shared/TopBar');

var Sensor = React.createClass({

  getInitialState: function() {
    return {
      isLive: false
    };
  },

  componentDidMount: function() {
  },

  handleSwitch: function() {
    var isLive = !this.state.isLive;
    console.log(isLive);
    this.setState({isLive: isLive});
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <div style={{textAlign: 'center', marginTop: 20}}>
          <p style={{marginBottom: 0}}>Is it live data?</p>
          <div className="switch large">
            <input className="switch-input"
              id="yes-no"
              type="checkbox"
              onClick={this.handleSwitch}
              name="exampleSwitch"/>
            <label className="switch-paddle" htmlFor="yes-no">
              <span className="show-for-sr">Do you like me?</span>
              <span className="switch-active" aria-hidden="true">Yes</span>
              <span className="switch-inactive" aria-hidden="true">No</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Sensor;

