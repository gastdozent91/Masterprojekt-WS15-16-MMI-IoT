var React = require('react')
  , TopBar = require('../shared/TopBar');

var SingleUser = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    userToCheck: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      fields: [
        'username',
        'firstname',
        'lastname',
        'password',
        'roles'
      ]
    };
  },

  renderFields: function() {
    // TODO: delete password
    var that = this;
    return this.state.fields.map(function(field) {
      var value = that.props.userToCheck[field];
      var text;
      if (field === 'roles') {
        if (value.length === 2)
          text = 'Admin';
        else
          text = 'User';
      } else if (field === 'password') {
        text = '****';
      } else {
        text = value || 'missing';
      }
      return (
        <div className='row' key={field}>
          <div className='large-4 columns'>
            {field}
          </div>
          <div className='large-8 columns'>
            {text}
          </div>
        </div>
      );
    });
  },

  renderSensors: function() {
    var that = this;
    if (!this.props.userToCheck.sensorList.length) {
      return (
        <div className='row'>
          <div className='columns'>
            No Sensors
          </div>
        </div>
      );
    }
    return this.props.userToCheck.sensorList.map(function(sensor) {
      return (
        <div className='row' key={sensor}>
          <div className='columns'>
            {sensor}
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <div className='row column' style={{float: 'none', marginTop: 10}}>
          <div className='callout'>
            <h3>{this.props.userToCheck.username}</h3>
            {this.renderFields()}
            <h5>Sensors</h5>
            {this.renderSensors()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleUser;

