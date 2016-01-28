var React = require('react')
  , TopBar = require('./shared/TopBar');

var Dashboard = React.createClass({

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
        <div className='row' style={{marginTop: 20}}>
          {/* Sensors area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'><a href='/sensors'>Sensors</a><div className='icons'></div></div>
              <div className='body'>
                <div>blablabla</div>
                <div>blablabla</div>
                <div>blablabla</div>
              </div>
            </div>
          </div>
          {/* Sensors area end */}
          {/* Gateway area */}
          <div className='large-6 columns'>
            <div className='dashboard-widget'>
              <div className='title'><a href='/gateways'>Gateways</a><div className='icons'></div></div>
              <div className='body'>
                <div>blablabla</div>
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
                <div>blablabla</div>
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
