var React = require('react')
  , _ = require('underscore');

var TopBar = React.createClass({

  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      infoStyle: {},
      isInfo: false
    };
  },

  componentDidMount: function() {
    this.posInfo();
    window.addEventListener('resize', this.posInfo);
  },

  posInfo: function() {
    var windowWidth = window.innerWidth;
    var rect = this.refs.profile.getBoundingClientRect();
    var infoStyle = _.clone(this.state.infoStyle);
    infoStyle.top = rect.top + rect.height;
    infoStyle.right = windowWidth - rect.right + 16;
    this.setState({infoStyle: infoStyle});
  },

  handleFrissClick: function() {
    window.location = '/';
  },

  handleProfileClick: function() {
    var infoStyle = _.clone(this.state.infoStyle);
    var isInfo = this.state.isInfo;
    if (isInfo) {
      infoStyle.display = 'none';
      infoStyle.opacity = 0;
      isInfo = false;
      this.setState({infoStyle: infoStyle, isInfo: isInfo});
    } else {
      infoStyle.display = 'block';
      infoStyle.top = infoStyle.top -5;
      isInfo = true;
      this.setState({infoStyle: infoStyle, isInfo: isInfo}, function() {
        setTimeout(function() {
          infoStyle = _.clone(infoStyle);
          infoStyle.top = infoStyle.top + 5;
          infoStyle.opacity = 1;
          this.setState({infoStyle: infoStyle});
        }.bind(this), 10);
      });
    }
  },

  handleLogout: function() {
    window.location = '/logout';
  },

  render: function() {
    return (
      <div className="top-bar">
        <div className='row'>
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text pointer"
                onClick={this.handleFrissClick}>
                FRISS
              </li>
              <li><a href="/sensors">Sensors</a></li>
              <li><a href="/gateways">Gateways</a></li>
              <li><a href="/clusters">Clusters</a></li>
              { this.props.user.isAdmin
              ? <li><a href="/users">Users</a></li>
              : null}
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='menu'>
              <li className='menu-text pointer'
                ref='profile'
                onClick={this.handleProfileClick}>
                {this.props.user.firstname || 'Admin'}
              </li>
            </ul>
          </div>
          <div className='profileinfo'
            ref='profileinfo'
            onClick={this.handleLogout}
            style={this.state.infoStyle}>
            Log out
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;
