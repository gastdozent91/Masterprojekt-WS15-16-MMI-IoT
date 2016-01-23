var React = require('react');

var Search = React.createClass({

  propTypes: {
    gateways: React.PropTypes.array,
    setGateways: React.PropTypes.func
  },

  getInitialState: function() {
    return {
    };
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
      this.props.setGateways(gateways);
    } else {
      gateways = this.props.gateways.filter(function(gateway) {
        var bool = false;
        bool = gateway.name.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = gateway.id.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.props.setGateways(gateways);
    }
  },

  render: function() {
    return (
      <div className='search-row'
        onChange={this.handleSearchChange}>
          <input type='text'
            ref='search'
            placeholder='name: Paul; id: Berlin' />
      </div>
    );
  }
});

module.exports = Search;

