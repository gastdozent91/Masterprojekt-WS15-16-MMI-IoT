var React = require('react')
  , Search = require('./Search')
  , TopBar = require('../shared/TopBar');

var Users = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    users: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      users: this.props.users,
      listClass: 'row column list'
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({listClass: 'row column list done'});
    }.bind(this), 0);
  },

  setUsers: function(users) {
    this.setState({users: users});
  },

  renderUsers: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            <b>username</b>
          </div>
          <div className='large-3 columns'>
            <b>firstname</b>
          </div>
          <div className='large-3 columns'>
            <b>lastname</b>
          </div>
          <div className='large-1 columns'>
            <b>sensorcount</b>
          </div>
          <div className='large-2 columns' style={{textAlign: 'end'}}>
            <b>Role</b>
          </div>
        </div>
        {this.state.users
        .sort(function(a, b) {
          if (a.username < b.username)
            return -1;
          if (a.username > b.username)
            return 1;
          return 0;
        })
        .map(function(user, i) {
          return this.renderUser(user, i)
        }.bind(this))}
      </div>
    );
  },

  renderUser: function(user, i) {
    return (
      <a href={'/user/' + user.username} key={'user #'+i}>
        <div className='row selectable-row'>
          <div className='large-3 columns'>
            {user.username}
          </div>
          <div className='large-3 columns'>
            {user.firstname || 'missing'}
          </div>
          <div className='large-3 columns'>
            {user.lastname || 'missing'}
          </div>
          <div className='large-1 columns'>
            {user.sensorCount || 0}
          </div>
          <div className='large-2 columns' style={{textAlign: 'end'}}>
            { this.renderRole(user) }
          </div>
        </div>
      </a>
    );
  },

  renderRole: function(user) {
    var isAdmin = user.roles.indexOf('ROLE_ADMIN') > -1;
    var role = isAdmin ? 'Admin' : 'User';
    return (
      <span>{role}</span>
    );
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <Search users={this.props.users}
          setUsers={this.setUsers} />
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <h5>Userlist</h5>
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Users;

