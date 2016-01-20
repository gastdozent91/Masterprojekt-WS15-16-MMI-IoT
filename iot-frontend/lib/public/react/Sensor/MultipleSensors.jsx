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
      listClass: 'row column list',
      backgroundStyle: {display: 'none'}
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({listClass: 'row column list done'});
    }.bind(this), 0);
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
      this.setState({sensors: sensors});
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
      this.setState({sensors: sensors});
    }
  },

  renderSensors: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            <b>ID</b>
          </div>
          <div className='large-3 columns'>
            <b>Location</b>
          </div>
          <div className='large-3 columns'>
            <b>Type</b>
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            <b>Gateway</b>
          </div>
        </div>
        {this.state.sensors
        .sort(function(a, b) {
          if (a.attachedGateway < b.attachedGateway)
            return -1;
          if (a.attachedGateway > b.attachedGateway)
            return 1;
          return 0;
        })
        .map(function(sensor, i) {
          return this.renderSensor(sensor, i)
        }.bind(this))}
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
            {sensor.id}
          </div>
          <div className='large-3 columns' style={{overflow: 'hidden'}}>
            {sensor.location}
          </div>
          <div className='large-3 columns'>
            {sensor.sensorType}
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            {sensor.attachedGateway}
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
              placeholder='id: Gyro; location: Berlin; type: Gyro; gateway: supergateway' />
          </label>
        </div>
        <div className={this.state.listClass} style={{float: 'none'}}>
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

