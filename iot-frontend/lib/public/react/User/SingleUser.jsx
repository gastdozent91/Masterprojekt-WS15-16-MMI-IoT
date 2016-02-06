var React = require('react')
  , EditUser = require('./EditUser')
  , DeleteUser = require('./DeleteUser')
  , TopBar = require('../shared/TopBar');

var SingleUser = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    userToCheck: React.PropTypes.object,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      editUser: false,
      deleteUser: false,
      fields: [
        'username',
        'firstname',
        'lastname',
        'password',
        'roles'
      ]
    };
  },

  handleEditUser: function() {
    this.setState({editUser: !this.state.editUser});
  },

  handleDeleteUser: function() {
    this.setState({deleteUser: !this.state.deleteUser});
  },

  renderFields: function() {
    // TODO: delete password
    var that = this;
    return this.state.fields.map(function(field) {
      var value = that.props.userToCheck[field];
      var text;
      if (field === 'roles') {
        if (value.indexOf('ROLE_ADMIN') > -1)
          text = 'Admin';
        else
          text = 'User';
      } else if (field === 'password') {
        text = value;
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
    if (!this.props.sensors.length) {
      return (
        <div className='row'>
          <div className='columns'>
            No Sensors
          </div>
        </div>
      );
    }
    return (
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.sensors.map(function(sensor) {
              return that.renderSensor(sensor)
            })
          }
        </tbody>
      </table>
    );
        {/*
        <div className='row' key={sensor.id}>
          <a href={'/sensor/' + sensor.id}>
            <div className='columns selectable-row'>
              {sensor.id}
            </div>
          </a>
        </div>
        */}
  },

  renderSensor: function(sensor) {
    return (
      <tr key={sensor.id}>
        <td>
          <a href={'/sensor/' + sensor.id}>
            {sensor.id}
          </a>
        </td>
        <td>
          {sensor.name}
        </td>
      </tr>
    );
  },

  render: function() {
    var displayStyle = this.state.editUser || this.state.deleteUser ? 'block' : 'none';
    return (
      <div>
        <TopBar user={this.props.user} activePage='users'/>
        <div className='row column' style={{float: 'none', marginTop: 25}}>
          <div className='callout'>
            <div className='row'>
              <div className='small-8 columns'>
                <h3>{this.props.userToCheck.username}</h3>
              </div>
              <div className='small-4 columns'
                style={{textAlign:'right'}}>
                <div className='button'
                  onClick={this.handleEditUser}>
                  Edit
                </div>
                <div className='button alert'
                  style={{marginRight:0}}
                  onClick={this.handleDeleteUser}>
                  Delete
                </div>
              </div>
            </div>
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
        {this.state.editUser
          ? <EditUser cancelCallback={this.handleEditUser}
            userToEdit={this.props.userToCheck}/>
          : null}
        {this.state.deleteUser
          ? <DeleteUser cancelCallback={this.handleDeleteUser}
            userToDelete={this.props.userToCheck}/>
          : null}
        <div className='background-area' style={{display: displayStyle}}></div>
      </div>
    );
  }
});

module.exports = SingleUser;
