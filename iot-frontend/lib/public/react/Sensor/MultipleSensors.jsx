var React = require('react')
  , _ = require('underscore');

var NewSensor = require('./NewSensor');

var MultipleSensors = React.createClass({

  propTypes: {
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      sensors: this.props.sensors,
      isAddingNew: false,
      backgroundStyle: {display: 'none'}
    };
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

  handleSearchChange: function() {
    var input = this.refs.search.value.toLowerCase();
    var checkName = input.indexOf('name:') > -1
      , checkLocation = input.indexOf('location:') > -1
      , checkType = input.indexOf('type:') > -1
      , checkGateway = input.indexOf('gateway:') > -1;

    var sensors = [];
    if (checkName || checkLocation || checkGateway || checkType) {
      var filterList = [
        'name',
        'location',
        'type',
        'gateway'
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
      var sensors = this.props.sensors.filter(sensor => {
        var bool = true;
        if (checkName) {
          var value = dic.name;
          bool = sensor.name.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLocation) {
          var value = dic.location;
          bool = sensor.location.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkType) {
          var value = dic.type;
          bool = sensor.type.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkGateway) {
          var value = dic.gateway;
          bool = sensor.gateway.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.setState({sensors: sensors});
    } else {
      var sensors = this.props.sensors.filter(sensor => {
        var bool = false;
        bool = sensor.name.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = sensor.location.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = sensor.gateway.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = sensor.type.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.setState({sensors: sensors});
    }
  },

  renderSensors: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            Name
          </div>
          <div className='large-3 columns'>
            Location
          </div>
          <div className='large-3 columns'>
            Type
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            Gateway
          </div>
        </div>
        {this.state.sensors
        .sort((a, b) => {
          if (a.gateway < b.gateway)
            return -1;
          if (a.gateway > b.gateway)
            return 1;
          return 0;
        })
        .map((sensor, i) => {
          return this.renderSensor(sensor, i)
        })}
      </div>
    );
  },

  renderSensor: function(sensor, i) {
    var state = sensor.active ? 'active' : 'inactive';
    var sensorClass = 'row ' + state;
    return (
      <a href='/sensors?size=1' key={'sensor #'+i}>
        <div className={sensorClass}>
          <div className='large-3 columns'>
            {sensor.name}
          </div>
          <div className='large-3 columns'>
            {sensor.location}
          </div>
          <div className='large-3 columns'>
            {sensor.type}
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            {sensor.gateway}
          </div>
        </div>
      </a>
    );
  },

  render: function() {
    return (
      <div>
        <div className='row column'
          onChange={this.handleSearchChange}
          style={{float: 'none', width: '50%'}}>
          <label>Search
            <input type='text'
              ref='search'
              placeholder='name: Gyro; location: Berlin; type: Gyro; gateway: supergateway' />
          </label>
        </div>
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
            <div className='row'>
              <div className='large-9 columns'>
                <h5>Sensorlist</h5>
              </div>
              <div className='large-3 columns' style={{textAlign: 'end'}}>
                <input className='button'
                  type='submit'
                  style={{marginRight: 0}}
                  onClick={this.handleNew}
                  value='Add New' />
              </div>
            </div>
            {this.renderSensors()}
          </div>
        </div>
        { this.state.isAddingNew
        ? <div className='new-sensor-container'>
            <div className='row column' style={{float: 'none'}}>
              <div className='callout'>
                <NewSensor handleNew={this.handleNew}/>
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

module.exports = MultipleSensors;

