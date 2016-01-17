var React = require('react')
  , TopBar = require('./shared/TopBar');

var Users = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    users: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      users: this.props.users
    };
  },

  handleSearchChange: function() {
    var input = this.refs.search.value.toLowerCase();
    var checkUserName = input.indexOf('username:') > -1
      , checkFirstName = input.indexOf('firstname:') > -1
      , checkLastName = input.indexOf('lastname:') > -1;

    var users = [];
    if (checkUserName || checkFirstName || checkLastName) {
      var filterList = [
        'username',
        'firstname',
        'lastname'
      ];
      var dic = {};
      var splittedInput = input.split(';');
      splittedInput.forEach(inputPiece => {
        inputPiece = inputPiece.trim();
        if (inputPiece.indexOf(':') > -1) {
          var pieceName = inputPiece.split(':')[0].trim().toLowerCase();
          var pieceValue = inputPiece.split(':')[1].trim().toLowerCase();
          var isCorrect = filterList.some(filterName => {
                            return filterName === pieceName;
                          });
          if (isCorrect) {
            dic[pieceName] = pieceValue;
          }
        }
      });
      var users = this.props.users.filter(user => {
        var bool = true;
        if (checkUserName) {
          var value = dic.username;
          bool = user.username.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkFirstName) {
          var value = dic.firstname;
          bool = user.firstname.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLastName) {
          var value = dic.lastname;
          bool = user.lastname.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.setState({users: users});
    } else {
      var users = this.props.users.filter(user => {
        var bool = false;
        bool = user.username.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = user.firstname.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = user.lastname.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.setState({users: users});
    }
  },

  renderUsers: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            username
          </div>
          <div className='large-3 columns'>
            firstname
          </div>
          <div className='large-3 columns'>
            lastname
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            Role
          </div>
        </div>
        {this.state.users
        .sort((a, b) => {
          if (a.username < b.username)
            return -1;
          if (a.username > b.username)
            return 1;
          return 0;
        })
        .map((user, i) => {
          return this.renderUser(user, i)
        })}
      </div>
    );
  },

  renderUser: function(user, i) {
    return (
      <a href={'/user/' + user.username} key={'user #'+i}>
        <div className='row'>
          <div className='large-3 columns'>
            {user.username}
          </div>
          <div className='large-3 columns'>
            {user.firstname}
          </div>
          <div className='large-3 columns'>
            {user.lastname}
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
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
        <div className='row column'
          onChange={this.handleSearchChange}
          style={{float: 'none', width: '50%'}}>
          <label>Search
            <input type='text'
              ref='search'
              placeholder='username: Max; firstname: Max; lastname: Mustermann' />
          </label>
        </div>
        <div className='row column' style={{float: 'none'}}>
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

