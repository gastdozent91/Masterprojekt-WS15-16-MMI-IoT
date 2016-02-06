var React = require('react')
  , request = require('superagent');

var EditUser = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    userToEdit: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      firstname: '',
      lastname: '',
      password: '',
      isAdmin: false,
    };
  },

  handleSaveClick: function(){
    //TODO send new data to backend
    console.log(this.state);
    var that = this;
    var role = this.state.isAdmin
      ? ['ROLE_USER', 'ROLE_ADMIN']
      : ['ROLE_USER'];
    var json = {
      firstname: this.state.firstname || this.props.userToEdit.firstname,
      lastname: this.state.lastname || this.props.userToEdit.lastname,
      password: this.state.password || this.props.userToEdit.password,
      roles: role
    };
    request
      .put('/user/' + this.props.userToEdit.username)
      .send(json)
      .end(function(err, res) {
        if (err) return console.log(err);
        //TODO: add warning
        //res.body === statuscode
        console.log(res);
        window.location.pathname = '/user/' + that.props.userToEdit.username;
      });
  },

  handleChange: function() {
    this.setState({
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      password: this.refs.password.value,
    });
  },

  handleAdminChange: function() {
    this.setState({isAdmin: !this.state.isAdmin});
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>Edit User: {this.props.userToEdit.username}</h2>
        <div className="body">
          <div className='row'>
            <div className='small-4 column'>
              firstname
            </div>
            <div className='small-8 column'>
              <input type='text'
                value={this.state.firstname}
                ref='firstname'
                placeholder={this.props.userToEdit.firstname}
                onChange={this.handleChange}/>
            </div>
          </div>
          <div className='row'>
            <div className='small-4 column'>
              lastname
            </div>
            <div className='small-8 column'>
              <input type='text'
                value={this.state.lastname}
                ref='lastname'
                placeholder={this.props.userToEdit.lastname}
                onChange={this.handleChange}/>
            </div>
          </div>
          <div className='row'>
            <div className='small-4 column'>
              password
            </div>
            <div className='small-8 column'>
              <input type='text'
                value={this.state.password}
                ref='password'
                placeholder={this.props.userToEdit.password}
                onChange={this.handleChange}/>
            </div>
          </div>
          <div className='row'>
            <div className='small-4 column'>
              Admin
            </div>
            <div className='small-8 column'>
              <input type='checkbox'
                checked={this.state.isAdmin}
                onChange={this.handleAdminChange}/>
            </div>
          </div>
          <div className='row columns' style={{marginTop: 25, textAlign: 'right'}}>
            <div className='small-12 column'>
              <div className='button alert' onClick={this.props.cancelCallback}>cancel</div>
              <div className='button' onClick={this.handleSaveClick}>save</div></div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EditUser;

