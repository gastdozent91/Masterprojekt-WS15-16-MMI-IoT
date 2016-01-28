var React = require('react')
  , TopBar = require('../shared/TopBar');

var SingleGateway = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    gateway: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <div>
          {this.props.gateway.name}
        </div>
      </div>
    );
  }
});

module.exports = SingleGateway;
