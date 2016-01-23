var React = require('react');

var Search = React.createClass({

  propTypes: {
    sensors: React.PropTypes.array,
    setSensors: React.PropTypes.func
  },

  getInitialState: function() {
    return {
    };
  },

  handleSearchChange: function() {
    var input = this.refs.search.value.toLowerCase();
    var checkName = input.indexOf('id:') > -1
      , checkLocation = input.indexOf('location:') > -1
      , checkType = input.indexOf('type:') > -1
      , checkGateway = input.indexOf('gateway:') > -1;

    var sensors = [];
    if (checkName || checkLocation || checkGateway || checkType) {
      var filterList = [
        'id',
        'location',
        'type',
        'gateway'
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
      sensors = this.props.sensors.filter(function(sensor) {
        var bool = true;
        var value;
        if (checkName) {
          value = dic.id;
          bool = sensor.id.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLocation) {
          value = dic.location;
          bool = sensor.location.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkType) {
          value = dic.type;
          bool = sensor.sensorType.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkGateway) {
          value = dic.gateway;
          bool = sensor.attachedGateway.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.props.setSensors(sensors);
    } else {
      sensors = this.props.sensors.filter(function(sensor) {
        var bool = false;
        bool = sensor.id.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = sensor.location.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = sensor.attachedGateway.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = sensor.sensorType.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.props.setSensors(sensors);
    }
  },

  render: function() {
    return (
      <div className='search-row'
        onChange={this.handleSearchChange}>
          <input type='text'
            ref='search'
            placeholder='id: Gyro; location: Berlin; type: Gyro; gateway: supergateway' />
      </div>
    );
  }
});

module.exports = Search;

