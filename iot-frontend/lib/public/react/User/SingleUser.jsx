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
        <tr key={field}>
          <td>
            {field}
          </td>
          <td>
            {text}
          </td>
        </tr>
      );
    });
  },

  renderSensors: function() {
    var that = this;
    if (!this.props.userToCheck.sensors.length) {
      return (
        <div className='row'>
          <div className='columns'>
            No Sensors
          </div>
        </div>
      );
    }
    return this.props.userToCheck.sensors.map(function(sensor) {
      return (
        <div className='row' key={sensor}>
          <a href={'/sensor/' + sensor}>
            <div className='columns selectable-row'>
              {sensor}
            </div>
          </a>
        </div>
      );
    });
  },

  render: function() {
    console.log(this.props.userToCheck);
    return (
      <div>
        <TopBar user={this.props.user} activePage='users'/>
        <div className='row column' style={{float: 'none', marginTop: 25}}>
          <div className='callout'>
            <h3>{this.props.userToCheck.username}</h3>
            <table style={{width: '100%'}}>
              <tbody style={{borderWidth: 0}}>
                {this.renderFields()}
              </tbody>
            </table>
          </div>
          <div className='callout'>
            <h5>Sensors</h5>
            {this.renderSensors()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleUser;
