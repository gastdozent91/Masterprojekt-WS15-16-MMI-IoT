var React = require('react')
  , TopBar = require('../shared/TopBar');

var SingleCluster = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    cluster: React.PropTypes.object,
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} activePage='clusters'/>
        <div>
          {this.props.cluster.name}
        </div>
      </div>
    );
  }
});

module.exports = SingleCluster;
