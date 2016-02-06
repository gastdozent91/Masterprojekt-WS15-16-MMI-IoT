var React = require('react')
  , ReactCSSTransitionGroup = require('react-addons-css-transition-group')
  , LogoutButton = require('./LogoutButton')
  , _ = require('underscore');

var TopBar = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    activePage: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      isInfo: false
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.user === this.props.user &&
        nextProps.activePage === this.props.activePage &&
        nextState.isInfo === this.state.isInfo) {
      return false;
    } else {
      return true;
    }
  },

  componentDidMount: function() {
  },

  handleFrissClick: function() {
    window.location = '/';
  },

  handleProfileClick: function() {
    this.setState({isInfo: !this.state.isInfo});
  },

  render: function() {
    console.log('render TopBar');
    return (
      <div className="top-bar">
        <div className='row'>
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text pointer"
                onClick={this.handleFrissClick}>
                FRISS
              </li>
              <li className={this.props.activePage === 'sensors' ? 'active' : ''}><a href="/sensors">Sensors</a></li>
              <li className={this.props.activePage === 'gateways' ? 'active' : ''}><a href="/gateways">Gateways</a></li>
              <li className={this.props.activePage === 'clusters' ? 'active' : ''}><a href="/clusters">Clusters</a></li>
              { this.props.user.isAdmin
              ? <li className={this.props.activePage === 'users' ? 'active' : ''}><a href="/users">Users</a></li>
              : null}
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='menu'>
              <li className='menu-text pointer'
                ref='profile'
                style={{position: 'relative'}}
                onClick={this.handleProfileClick}>
                {this.props.user.username}
                <ReactCSSTransitionGroup transitionName='profileinfo'
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}>
                  {!this.state.isInfo ? null :
                    <LogoutButton />
                  }
                </ReactCSSTransitionGroup>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;
