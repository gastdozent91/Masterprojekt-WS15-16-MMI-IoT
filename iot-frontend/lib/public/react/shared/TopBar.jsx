var React = require('react');

var TopBar = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div className="top-bar">
        <div className='row'>
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text">FRISS</li>
              <li className="has-submenu">
                <a href="/sensors">Sensors</a>
                <ul className="submenu menu vertical" data-submenu>
                  <li><a href="#">One</a></li>
                  <li><a href="#">Two</a></li>
                  <li><a href="#">Three</a></li>
                </ul>
              </li>
              <li><a href="/gateways">Gateways</a></li>
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='menu'>
              <li><a href='#'>{this.props.user}</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TopBar;
