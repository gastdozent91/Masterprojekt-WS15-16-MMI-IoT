var React = require('react')
  , _ = require('underscore');

var Search = require('./Search')
  , NewGateway = require('./NewGateway')
  , TopBar = require('../shared/TopBar');

var Gateway = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    gateways: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      gateways: this.props.gateways,
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

  setGateways: function(gateways) {
    this.setState({gateways: gateways});
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
      <a href={'/gateway/' + gateway.id} key={'gateway #'+i}>
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
        <TopBar user={this.props.user} activePage='gateways'/>
        <Search gateways={this.props.gateways}
          setGateways={this.setGateways} />
        {/* Gateways area */}
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <div className='row'>
              <div className='large-9 columns'>
                <h5>Overview</h5>
              </div>
              <div className='large-3 columns' style={{textAlign: 'end'}}>
                <input className='button'
                  type='submit'
                  style={{marginRight: 0}}
                  onClick={this.handleNew}
                  value='Add New' />
              </div>
            </div>
            {this.renderGateways()}
          </div>
        </div>
        {/* Gateways area end */}
        { this.state.isAddingNew
        ? <div className='new-gateway-container'>
            <div className='row column' style={{float: 'none'}}>
              <div className='callout'>
                <NewGateway handleNew={this.handleNew}
                  user={this.props.user}/>
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

module.exports = Gateway;
