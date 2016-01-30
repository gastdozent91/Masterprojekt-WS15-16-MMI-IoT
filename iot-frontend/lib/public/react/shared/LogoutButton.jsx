var React = require('react');

var LogoutButton = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {
    };
  },

  handleLogout: function() {
    window.location = '/logout';
  },

  render: function() {
    return (
      <div className="profileinfo"
        onClick={this.handleLogout}>
        Logout
      </div>
    );
  }
});

module.exports = LogoutButton;

