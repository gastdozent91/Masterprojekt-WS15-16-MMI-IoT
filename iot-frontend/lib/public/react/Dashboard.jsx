var React = require('react')
  , Console = require('./Console')
  , Chart = require('./Chart')
  , TopBar = require('./shared/TopBar')
  , rabbit = require('../js/rabbit');

var Dashboard = React.createClass({

  propTypes: {
    user: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
    if (typeof window === 'undefined') return;
    var graph = document.getElementsByClassName('graph')[0];
    var dimension = [graph.offsetWidth, graph.offsetHeight];
    this.setState({dimension: dimension});
    rabbit.connect();
  },

  renderChart: function() {
    if (this.state.dimension) {
      return (
        <Chart dimension={this.state.dimension} />
      );
    }
  },

  renderConsole: function() {
    if (this.state.dimension) {
      return (
        <Console />
      );
    }
  },


  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <div className='row column'>
          <h1 className='docs-page-title'>Dashboard</h1>
        </div>
        {/* Input area */}
        <div className='row column'>
          <div className='callout'>
            <h5>Throughput</h5>
            <div className='row'>
              <div className='large-6 columns'>
              {/*<div className='console realtime'></div>*/}
                <Console />
              </div>
              <div className='large-6 columns'>
                <div className='graph realtime'>
                  {this.renderChart()}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Input area end */}
        <br/>
        {/* Button area */}
        <div className='row'>
          <div className='large-6 columns'>
            <div className='callout'>
              <h5>Add</h5>
              <div className='button-group'>
                <button type='button' className='button'>
                  Sensor
                </button>
                <button type='button' className='button'>
                  Gateway
                </button>
              </div>
            </div>
          </div>
          <div className='large-6 columns'>
            <div className='callout'>
              <h5>Edit</h5>
              <div className='button-group'>
                <button type='button' className='button'>
                  Sensor
                </button>
                <button type='button' className='button'>
                  Sensor
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Button area end */}
        <br/>
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
            <h5>Cluster</h5>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
