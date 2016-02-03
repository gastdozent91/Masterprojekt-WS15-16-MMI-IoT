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
      if (sensor.attachedCluster.length === 0)
        withNoCluster++;
      if (sensor.active)
        active++;
    });
    return (
      <div>
        <div>{infoString}</div>
        <div>{withNoCluster + ' sensors are not attached to a cluster'}</div>
        <div>{active + ' sensors are not active'}</div>
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
                <div>{this.getGatewayString()}</div>
                <div>blablabla</div>
                <div>blablabla</div>
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
                <div>{this.getClusterString()}</div>
                <div>blablabla</div>
                <div>blablabla</div>
              </div>
            </div>
          </div>
          {/* Cluster area end */}
          {/* Statistic area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'>Statistic<div className='icons'></div></div>
              <div className='body'>
                <div>blablabla</div>
                <div>blablabla</div>
                <div>blablabla</div>
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
