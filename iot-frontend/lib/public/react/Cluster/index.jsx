var React = require('react')
  , Search = require('./Search')
  , TopBar = require('../shared/TopBar');

var Cluster = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    clusters: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      clusters: this.props.clusters,
      listClass: 'row column list'
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({listClass: 'row column list done'});
    }.bind(this), 0);
  },

  setClusters: function(clusters) {
    this.setState({clusters: clusters});
  },

  renderClusters: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-6 columns'>
            <b>Name</b>
          </div>
          <div className='large-6 columns' style={{textAlign: 'end'}}>
            <b>ID</b>
          </div>
        </div>
        {this.state.clusters
        .sort(function(a, b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        })
        .map(function(cluster, i) {
          return this.renderCluster(cluster, i)
        }.bind(this))}
      </div>
    );
  },

  renderCluster: function(cluster, i) {
    //var state = cluster.active ? 'active' : 'inactive';
    var state = 'active';
    var clusterClass = 'row ' + state + ' selectable-row';
    return (
      <a href='/sensors' key={'gateway #'+i}>
        <div className={clusterClass}>
          <div className='large-6 columns'>
            {cluster.name}
          </div>
          <div className='large-6 columns' style={{textAlign: 'end'}}>
            {cluster.id}
          </div>
        </div>
      </a>
    );
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <Search clusters={this.props.clusters}
          setClusters={this.setClusters} />
        {/* Cluster area */}
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <h5>Clusterlist</h5>
            {this.renderClusters()}
          </div>
        </div>
        {/* Cluster area end */}
      </div>
    );
  }
});

module.exports = Cluster;

