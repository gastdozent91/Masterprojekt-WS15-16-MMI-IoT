var React = require('react')
  , request = require('superagent');

var Login = React.createClass({

  getInitialState: function() {
    return {
      user: 'Guest',
      password: 'password'
    };
  },

  componentDidMount: function() {
  },

  handleChangeName: function(event) {
    this.setState({user: event.target.value});
  },

  handleChangePassword: function(event) {
    this.setState({password: event.target.value});
  },

  handleClick: function(event) {
    console.log('click');
    var json = {
      username: this.state.user,
      password: this.state.password
    };
    request
      .post('/login')
      .send(json)
      .end(function(err, res) {
        if (err) return console.log(res);
        if (res.statusCode === 200)
          window.location.pathname = '/';
      });
  },

  render: function() {
    return (
      <div>
        <div className='row column login-container'>
          <div className='callout'>
            <div className='row'>
              <div className='large-12 columns'>
                <input type='text'
                  placeholder='User'
                  name='username'
                  value={this.state.user}
                  onChange={this.handleChangeName}/>
                <input type='password'
                  placeholder='Password'
                  value={this.state.password}
                  name='password'
                  onChange={this.handleChangePassword}/>
              </div>
              <div className='large-12 columns buttonwrapper'>
                <input className='button'
                  type='submit'
                  onClick={this.handleClick}
                  value='Log In'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;

