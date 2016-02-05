var React = require('react');

var Search = React.createClass({

  propTypes: {
    users: React.PropTypes.array,
    setUsers: React.PropTypes.func
  },

  getInitialState: function() {
    return {
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
      splittedInput.forEach(function(inputPiece) {
        inputPiece = inputPiece.trim();
        if (inputPiece.indexOf(':') > -1) {
          var pieceName = inputPiece.split(':')[0].trim().toLowerCase();
          var pieceValue = inputPiece.split(':')[1].trim().toLowerCase();
          var isCorrect = filterList.some(function(filterName) {
                            return filterName === pieceName;
                          });
          if (isCorrect) {
            dic[pieceName] = pieceValue;
          }
        }
      });
      users = this.props.users.filter(function(user) {
        if (!user.firstname) return true;
        var bool = true;
        var value;
        if (checkUserName) {
          value = dic.username;
          bool = user.username.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkFirstName) {
          value = dic.firstname;
          bool = user.firstname.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLastName) {
          value = dic.lastname;
          bool = user.lastname.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.props.setUsers(users);
    } else {
      users = this.props.users.filter(function(user) {
        if (!user.firstname) return true;
        var bool = false;
        bool = user.username.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = user.firstname.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = user.lastname.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.props.setUsers(users);
    }
  },

  render: function() {
    return (
      <div className='search-row row column'
        onChange={this.handleSearchChange}>
          <input type='text'
            ref='search'
            placeholder='username: Max; firstname: Max; lastname: Mustermann' />
      </div>
    );
  }
});

module.exports = Search;
