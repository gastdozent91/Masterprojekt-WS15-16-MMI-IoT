var React = require('react')
  , TopBar = require('../shared/TopBar')
  , _ = require('underscore');

var NewSensor = require('./NewSensor')
  , Search = require('./Search');

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

  setSensors: function(sensors) {
    this.setState({sensors: sensors});
  },

  renderSensors: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            <b>Name</b>
          </div>
          <div className='large-3 columns'>
            <b>ID</b>
          </div>
          <div className='large-3 columns'>
            <b>Location</b>
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            <b>Type</b>
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
    var state = sensor.isActive ? 'active' : 'inactive';
    var sensorClass = 'row ' + state + ' selectable-row';
    return (
      <a href={'/sensor/' + sensor.id} key={'sensor #'+i}>
        <div className={sensorClass}>
          <div className='large-3 columns'>
            {sensor.name}
          </div>
          <div className='large-3 columns' style={{overflow: 'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
            {sensor.id}
          </div>
          <div className='large-3 columns' style={{overflow: 'hidden'}}>
            {sensor.location}
          </div>
          <div className='large-3 columns' style={{textAlign: 'end'}}>
            {sensor.types === null ? '' : sensor.types.join(', ')}
          </div>
        </div>
      </a>
    );
  },

  render: function() {
    console.log('render Sensor');
    return (
      <div>
        <TopBar user={this.props.user} activePage='sensors' />
        <Search sensors={this.props.sensors}
          setSensors={this.setSensors}/>
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
