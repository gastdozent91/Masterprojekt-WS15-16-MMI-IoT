var React = require('react')
  , TopBar = require('../shared/TopBar');

var SingleGateway = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    gateway: React.PropTypes.object,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    console.log(this.props);
    return {
    };
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} activePage='gateways'/>
        <div>
          {this.props.gateway.name}
        </div>
      </div>
    );
  }
});

module.exports = SingleGateway;
