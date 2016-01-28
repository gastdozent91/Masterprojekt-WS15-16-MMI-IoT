var React = require('react')
  , _ = require('underscore');

var Search = require('./Search')
  , NewCluster = require('./NewCluster')
  , TopBar = require('../shared/TopBar');

var Cluster = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    clusters: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      clusters: this.props.clusters,
      isAddingNew: false,
      listClass: 'row column list',
      backgroundStyle: {display: 'none'}
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

  handleNew: function() {
    var isAddingNew = !this.state.isAddingNew;
    var backgroundStyle = _.clone(this.state.backgroundStyle);
    if (isAddingNew)
      backgroundStyle.display = 'block';
    else
      backgroundStyle.display = 'none';
    this.setState({isAddingNew: isAddingNew,
    backgroundStyle: backgroundStyle});
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
        <TopBar user={this.props.user} activePage='clusters'/>
        <Search clusters={this.props.clusters}
          setClusters={this.setClusters} />
        {/* Cluster area */}
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <div className='row'>
              <div className='large-9 columns'>
                <h5>Clusterlist</h5>
              </div>
              <div className='large-3 columns' style={{textAlign: 'end'}}>
                <input className='button'
                  type='submit'
                  style={{marginRight: 0}}
                  onClick={this.handleNew}
                  value='Add New' />
              </div>
            </div>
            {this.renderClusters()}
          </div>
        </div>
        {/* Cluster area end */}
        { this.state.isAddingNew
        ? <div className='new-cluster-container'>
            <div className='row column' style={{float: 'none'}}>
              <div className='callout'>
                <NewCluster handleNew={this.handleNew}/>
              </div>
            </div>
          </div>
        : null }
        <div className='background-area' style={this.state.backgroundStyle}>
        </div>
      </div>
    );
  }
});

module.exports = Cluster;
