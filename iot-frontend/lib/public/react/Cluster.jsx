var React = require('react')
  , TopBar = require('./shared/TopBar');

var Cluster = React.createClass({

  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
      </div>
    );
  }
});

module.exports = Cluster;

