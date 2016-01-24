var React = require('react')
  , request = require('superagent');

var NewUser = React.createClass({

  propTypes: {
    handleNew: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      isAdmin: false,
      fields: [
        {name: 'username', func: this.handleUsernameChange, placeholder: 'Ray'},
        {name: 'firstname', func: this.handleFirstnameChange, placeholder: 'Ray'},
        {name: 'lastname', func: this.handleLastnameChange, placeholder: 'McCool'},
        {name: 'password', func: this.handlePasswordChange, placeholder: 'password'},
        {name: 'role', func: this.handleRoleChange}
      ]
    };
  },

  handleUsernameChange: function() {
    var input = this.refs.username.value;
    console.log('username', input);
    this.setState({username: input});
  },

  handleFirstnameChange: function() {
    var input = this.refs.firstname.value;
    console.log('firstname', input);
    this.setState({firstname: input});
  },

  handleLastnameChange: function() {
    var input = this.refs.lastname.value;
    console.log('lastname', input);
    this.setState({lastname: input});
  },

  handlePasswordChange: function() {
    var input = this.refs.password.value;
    console.log('password', input);
    this.setState({password: input});
  },

  handleRoleChange: function() {
  },

  handleCancel: function() {
    this.props.handleNew();
  },

  handleSave: function() {
    var that = this;
    if (this.state.username &&
        this.state.firstname &&
        this.state.lastname &&
        this.state.password) {
      var role = this.state.isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER';
      var json = {
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        password: this.state.password,
        roles: [role]
      };
      request
        .post('/user')
        .send(json)
        .end(function(err, res) {
          if (err) return console.log(err);
          //TODO: add warning
          //res.body === statuscode
          console.log(res);
          that.props.handleNew();
        });
    }
  },

  handleRoleChange: function() {
  },

  handleAdminClick: function() {
    this.setState({isAdmin: !this.state.isAdmin});
  },

  renderFields: function() {
    var that = this;
    return this.state.fields.map(function(field) {
      return (
        <div className='row'
          key={field.name}
          onChange={field.func}>
          { field.name !== 'role'
          ? <div>
              <div className='large-4 columns'>
              {field.name}
              </div>
              <div className='large-8 columns'>
                <input type='text'
                  placeholder={field.placeholder}
                  ref={field.name} />
              </div>
            </div>
          : <div>
              <div className='large-4 columns'>
                 {field.name}
               </div>
               <div className='large-8 columns'>
                 <span>Admin </span>
                 <input type='checkbox'
                   checked={that.state.isAdmin}
                   onChange={that.handleAdminClick}
                   ref='checkAdmin'/>
              </div>
            </div>
          }
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-8 large-centered columns'>
          <h2>Add a User</h2>
          {this.renderFields()}
          <div className='row column' style={{textAlign: 'end'}}>
            <input type='button'
              className='button'
              value='Save'
              onClick={this.handleSave} />
            <input type='button'
              className='alert button'
              value='Cancel'
              style={{marginRight: 0}}
              onClick={this.handleCancel} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = NewUser;

