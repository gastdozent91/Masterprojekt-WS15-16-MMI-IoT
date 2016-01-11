var React = require('react')
  , TopBar = require('./shared/TopBar');

var Gateway = React.createClass({

  propTypes: {
    user: React.PropTypes.string,
    gateways: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      gateways: this.props.gateways
    };
  },

  componentDidMount: function() {
  },

  handleSearchChange: function() {
    var input = this.refs.search.value.toLowerCase();
    var checkName = input.indexOf('name:') > -1
      , checkLocation = input.indexOf('location:') > -1;

    var gateways = [];
    if (checkName || checkLocation) {
      var filterList = [
        'name',
        'location'
      ];
      var dic = {};
      var splittedInput = input.split(';');
      splittedInput.forEach(inputPiece => {
        inputPiece = inputPiece.trim();
        if (inputPiece.indexOf(':') > -1) {
          var pieceName = inputPiece.split(':')[0].trim().toLowerCase();
          var pieceValue = inputPiece.split(':')[1].trim().toLowerCase();
          var isCorrect = filterList.some(filterName => {
                            return filterName === pieceName;
                          });
          if (isCorrect) {
            dic[pieceName] = pieceValue;
          }
        }
      });
      var gateways = this.props.gateways.filter(gateway => {
        var bool = true;
        if (checkName) {
          var value = dic.name;
          bool = gateway.name.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLocation) {
          var value = dic.location;
          bool = gateway.location.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.setState({gateways: gateways});
    } else {
      var gateways = this.props.gateways.filter(gateway => {
        var bool = false;
        bool = gateway.name.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = gateway.location.toLowerCase().indexOf(input) > -1;
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
            Name
          </div>
          <div className='large-6 columns' style={{textAlign: 'end'}}>
            Location
          </div>
        </div>
        {this.state.gateways
        .sort((a, b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        })
        .map((gateway, i) => {
          return this.renderGateway(gateway, i)
        })}
      </div>
    );
  },

  renderGateway: function(gateway, i) {
    var state = gateway.active ? 'active' : 'inactive';
    var gatewayClass = 'row ' + state;
    return (
      <a href='/sensors' key={'gateway #'+i}>
        <div className={gatewayClass}>
          <div className='large-6 columns'>
            {gateway.name}
          </div>
          <div className='large-6 columns' style={{textAlign: 'end'}}>
            {gateway.location}
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
                placeholder='name: Paul; location: Berlin' />
            </label>
          </div>
        </div>
        { /* Search area end */ }
        {/* Gateways area */}
        <div className='row column' style={{float: 'none'}}>
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

