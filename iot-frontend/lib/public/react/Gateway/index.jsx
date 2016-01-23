var React = require('react')
  , Search = require('./Search')
  , TopBar = require('../shared/TopBar');

var Gateway = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    gateways: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      gateways: this.props.gateways,
      listClass: 'row column list'
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({listClass: 'row column list done'});
    }.bind(this), 0);
  },

  setGateways: function(gateways) {
    this.setState({gateways: gateways});
  },

  renderGateways: function() {
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
        {this.state.gateways
        .sort(function(a, b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        })
        .map(function(gateway, i) {
          return this.renderGateway(gateway, i)
        }.bind(this))}
      </div>
    );
  },

  renderGateway: function(gateway, i) {
    //var state = gateway.active ? 'active' : 'inactive';
    var state = 'active';
    var gatewayClass = 'row ' + state + ' selectable-row';
    return (
      <a href='/sensors' key={'gateway #'+i}>
        <div className={gatewayClass}>
          <div className='large-6 columns'>
            {gateway.name}
          </div>
          <div className='large-6 columns' style={{textAlign: 'end'}}>
            {gateway.id}
          </div>
        </div>
      </a>
    );
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <Search gateways={this.props.gateways}
          setGateways={this.setGateways} />
        {/* Gateways area */}
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <h5>Gatewaylist</h5>
            {this.renderGateways()}
          </div>
        </div>
        {/* Gateways area end */}
      </div>
    );
  }
});

module.exports = Gateway;

