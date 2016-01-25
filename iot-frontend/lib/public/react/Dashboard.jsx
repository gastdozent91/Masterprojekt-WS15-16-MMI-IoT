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
            <div className='callout'>
              <h5>Sensors</h5>
              <div>blablabla</div>
              <div>blablabla</div>
              <div>blablabla</div>
            </div>
          </div>
          {/* Sensors area end */}
          {/* Gateway area */}
          <div className='large-6 columns'>
            <div className='callout'>
              <h5>Gateways</h5>
              <div>blablabla</div>
              <div>blablabla</div>
              <div>blablabla</div>
            </div>
          </div>
          {/* Gateway area */}
        </div>
        <div className='row'>
          {/* Cluster area */}
          <div className='large-6 columns'>
            <div className='callout'>
              <h5>Clusters</h5>
              <div>blablabla</div>
              <div>blablabla</div>
              <div>blablabla</div>
            </div>
          </div>
          {/* Cluster area end */}
          {/* Statistic area */}
          <div className='large-6 columns'>
            <div className='callout'>
              <h5>Statistic</h5>
              <div>blablabla</div>
              <div>blablabla</div>
              <div>blablabla</div>
            </div>
          </div>
          {/* Statistic area end */}
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
