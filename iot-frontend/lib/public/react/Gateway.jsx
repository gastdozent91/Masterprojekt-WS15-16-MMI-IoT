var React = require('react')
  , TopBar = require('./shared/TopBar');

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

  handleSearchChange: function() {
    var input = this.refs.search.value.toLowerCase();
    var checkName = input.indexOf('name:') > -1
      , checkLocation = input.indexOf('id:') > -1;

    var gateways = [];
    if (checkName || checkLocation) {
      var filterList = [
        'name',
        'id'
      ];
      var dic = {};
      var splittedInput = input.split(';');
      splittedInput.forEach(function(inputPiece) {
        inputPiece = inputPiece.trim();
        if (inputPiece.indexOf(':') > -1) {
          var pieceName = inputPiece.split(':')[0].trim().toLowerCase();
          var pieceValue = inputPiece.split(':')[1].trim().toLowerCase();
          var isCorrect = filterList.some(function(filterName) {
                            return filterName === pieceName;
                          });
          if (isCorrect) {
            dic[pieceName] = pieceValue;
          }
        }
      });
      gateways = this.props.gateways.filter(function(gateway) {
        var bool = true;
        var value;
        if (checkName) {
          value = dic.name;
          bool = gateway.name.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLocation) {
          value = dic.id;
          bool = gateway.id.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.setState({gateways: gateways});
    } else {
      gateways = this.props.gateways.filter(function(gateway) {
        var bool = false;
        bool = gateway.name.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = gateway.id.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.setState({gateways: gateways});
    }
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
    var gatewayClass = 'row ' + state;
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
        { /* Search area */ }
        <div>
          <div className='row column'
            onChange={this.handleSearchChange}
            style={{float: 'none', width: '50%'}}>
            <label>Search
              <input type='text'
                ref='search'
                placeholder='name: Paul; id: Berlin' />
            </label>
          </div>
        </div>
        { /* Search area end */ }
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

