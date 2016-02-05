var React = require('react')
  , _ = require('underscore');

var Search = require('./Search')
  , NewUser = require('./NewUser')
  , TopBar = require('../shared/TopBar');

var Users = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    users: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      users: this.props.users,
      isAddingNew: false,
      listClass: 'row column list',
      backgroundStyle: {display: 'none'}
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

  handleNew: function() {
    var isAddingNew = !this.state.isAddingNew;
    var backgroundStyle = _.clone(this.state.backgroundStyle);
    if (isAddingNew)
      backgroundStyle.display = 'block';
    else
      backgroundStyle.display = 'none';
    this.setState({isAddingNew: isAddingNew,
    backgroundStyle: backgroundStyle});
  },

  renderUsers: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            <b>Username</b>
          </div>
          <div className='large-3 columns'>
            <b>Firstname</b>
          </div>
          <div className='large-3 columns'>
            <b>Lastname</b>
          </div>
          <div className='large-1 columns'>
            <b>Sensors</b>
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
            {user.firstname || 'Not Specified'}
          </div>
          <div className='large-3 columns'>
            {user.lastname || 'Not Specified'}
          </div>
          <div className='large-1 columns'>
            0
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
        <TopBar user={this.props.user} activePage='users'/>
        <Search users={this.props.users}
          setUsers={this.setUsers} />
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <div className='row'>
              <div className='large-9 columns'>
                <h5>Overview</h5>
              </div>
              <div className='large-3 columns' style={{textAlign: 'end'}}>
                <input className='button'
                  type='submit'
                  style={{marginRight: 0}}
                  onClick={this.handleNew}
                  value='Add New' />
              </div>
            </div>
            {this.renderUsers()}
          </div>
        </div>
        { this.state.isAddingNew
        ? <div className='new-user-container'>
            <div className='row column' style={{float: 'none'}}>
              <div className='callout'>
                <NewUser handleNew={this.handleNew}/>
              </div>
            </div>
          </div>
        : null }
        <div className='background-area' style={this.state.backgroundStyle}>
        </div>
      </div>
    );
  }
});

module.exports = Users;
