var React = require('react')
  , TopBar = require('./shared/TopBar');

var Dashboard = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    sensors: React.PropTypes.array,
    gateways: React.PropTypes.array,
    clusters: React.PropTypes.array
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  getGatewayString: function() {
    var result = 'You have ';
    if (this.props.gateways.length !== 1)
      result += this.props.gateways.length + ' gateways';
    else
      result += this.props.gateways.length + ' gateway';
    return result;
  },

  getClusterString: function() {
    var result = 'You have ';
    if (this.props.clusters.length !== 1)
      result += this.props.clusters.length + ' clusters';
    else
      result += this.props.clusters.length + ' cluster';
    return result;
  },

  renderSensorInfo: function() {
    var infoString = 'You have ';
    if (this.props.sensors.length !== 1)
      infoString += this.props.sensors.length + ' sensors';
    else
      infoString += this.props.sensors.length + ' sensor';
    var withNoCluster = 0;
    var active = 0;
    this.props.sensors.forEach(function(sensor) {
      if (!sensor.attachedCluster)
        withNoCluster++;
      if (sensor.isActive)
        active++;
    });
    return (
      <div>
        <div>{infoString}</div>
        <div>{withNoCluster + ' sensors are not attached to a cluster'}</div>
        <div>{active + ' sensors are active'}</div>
      </div>
    );
  },

  renderGatewayInfo: function() {
    var result = 'You have ';
    if (this.props.gateways.length !== 1)
      result += this.props.gateways.length + ' gateways';
    else
      result += this.props.gateways.length + ' gateway';
    var noSensors = 0;
    this.props.gateways.forEach(function(gateway) {
      var hasSensors = false;
      this.props.sensors.forEach(function(sensor) {
        if (!hasSensors) {
          if (gateway.id === sensor.attachedGateway)
            hasSensors = true;
        }
      });
      if (!hasSensors) noSensors++;
    }.bind(this));
    var hasNoSensors = noSensors + ' of your gateways don\'t have sensors';
    return (
      <div>
        <div>{result}</div>
        <div>{hasNoSensors}</div>
      </div>
    );
  },

  renderClusterInfo: function() {
    var result = 'You have ';
    if (this.props.clusters.length !== 1)
      result += this.props.clusters.length + ' clusters';
    else
      result += this.props.clusters.length + ' cluster';
    this.props.clusters.sort(function(a, b) {
      return new Date(b.creationDate) - new Date(a.creationDate);
    });
    var last = 'The last cluster was created at: ' +
      this.props.clusters[0].creationDate;
    var noSensors = 0;
    this.props.clusters.forEach(function(cluster) {
      var hasSensors = false;
      this.props.sensors.forEach(function(sensor) {
        if (!hasSensors) {
          if (cluster.id === sensor.attachedCluster)
            hasSensors = true;
        }
      });
      if (!hasSensors) noSensors++;
    }.bind(this));
    var hasNoSensors = noSensors + ' of your clusters don\'t have sensors';
    return (
      <div>
        <div>{result}</div>
        <div>{last}</div>
        <div>{hasNoSensors}</div>
      </div>
    );
  },

  renderUserInfo: function() {
    var result = 'Logged in as ' + this.props.user.username;
    var admin;
    if (this.props.user.isAdmin)
      admin = 'You are Admin';
    else
      admin = 'You are not an Admin';
    return (
      <div>
        <div>{result}</div>
        <div>{admin}</div>
      </div>
    );
  },

  render: function() {
    console.log('render Dashboard');
    return (
      <div>
        <TopBar user={this.props.user} activePage=''/>
        <div className='row' style={{marginTop: 20}}>
          {/* Sensors area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'><a href='/sensors'>Sensors</a><div className='icons'></div></div>
              <div className='body'>
                {this.renderSensorInfo()}
              </div>
            </div>
          </div>
          {/* Sensors area end */}
          {/* Gateway area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'><a href='/gateways'>Gateways</a><div className='icons'></div></div>
              <div className='body'>
                {this.renderGatewayInfo()}
              </div>
            </div>
          </div>
          {/* Gateway area */}
        </div>
        <div className='row'>
          {/* Cluster area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'><a href='/clusters'>Clusters</a><div className='icons'></div></div>
              <div className='body'>
                {this.renderClusterInfo()}
              </div>
            </div>
          </div>
          {/* Cluster area end */}
          {/* Statistic area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'>User Information
                <div className='icons'>
                </div>
              </div>
              <div className='body'>
                {this.renderUserInfo()}
              </div>
            </div>
          </div>
          {/* Statistic area end */}
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
