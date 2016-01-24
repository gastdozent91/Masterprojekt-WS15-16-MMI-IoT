var React = require('react');

var NewUser = React.createClass({

  propTypes: {
    handleNew: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      role: '',
      fields: [
        {name: 'username', func: this.handleUsernameChange},
        {name: 'firstname', func: this.handleFirstnameChange},
        {name: 'lastname', func: this.handleLastnameChange},
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
    this.setState({gateway: input});
  },

  handleRoleChange: function() {
    var input = this.refs.role.value;
    console.log('role', input);
    this.setState({role: input});
  },

  handleCancel: function() {
    this.props.handleNew();
  },

  renderFields: function() {
    return this.state.fields.map(function(field) {
      return (
        <div className='row'
          key={field.name}
          onChange={field.func}>
          <div className='large-4 columns'>
            {field.name}
          </div>
          <div className='large-8 columns'>
            <input type='text'
              ref={field.name} />
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-8 large-centered columns'>
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

