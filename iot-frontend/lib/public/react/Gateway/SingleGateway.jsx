var React = require('react')
  , TopBar = require('../shared/TopBar');

var EditGateway = require('./EditGateway')
  , DeleteGateway = require('./DeleteGateway')
  , AddSensor = require('./AddSensor');

var SingleGateway = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    gateway: React.PropTypes.object,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    console.log(this.props);
    return {
      fields: [
        ['id', 'ID'],
        ['name', 'Name'],
        ['owner', 'Owner']
      ],
      editGateway: false,
      deleteSensor: false,
      addSensor: false
    };
  },

  handleClickOnSensor: function(id){
    return function() {
      window.location = '/sensor/' + id;
    }
  },

  handleEditGateway: function(){
    this.setState({editGateway : !this.state.editGateway});
  },

  handleDeleteGateway: function(){
    this.setState({deleteGateway : !this.state.deleteGateway});
  },

  handleAddSensor: function(){
    this.setState({addSensor: !this.state.addSensor})
  },

  renderFields: function(){
    var that = this;
    return this.state.fields.map(function(field){
      var value;
      var caption;
      var id;
      if(Array.isArray(field)){
        id = field[0];
        value = that.props.gateway[field[0]] || 'missing';
        caption = field[1];
      }else{
        value = that.props.gateway[field] || 'missing';
        caption = field;
        id = field;
      }
      var text = value;
      return(
        <tr key={caption}>
          <td>{caption}</td>
          <td>{id === 'owner' ? <a href={"/user/" + text}>{text}</a> : text}</td>
        </tr>
      );
    });
  },

  renderSensors: function(){
    return(
      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Location</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody style={{borderWidth: 0}}>
          {this.props.sensors.map(function(sensor){
            return this.renderSensor(sensor);
          }.bind(this))}
        </tbody>
      </table>
    );
  },

  renderSensor: function(sensor){
    var types = sensor.types || [];
    return (
      <tr className='selectable-row' style={{cursor: 'pointer'}} onClick={this.handleClickOnSensor(sensor.id)} key={sensor.id}>
        <td>{sensor.name}</td>
        <td>{sensor.id}</td>
        <td>{sensor.location}</td>
        <td>{sensor.types.join(', ')}</td>
      </tr>
    );
  },

  render: function() {
    console.log(this.props.gateway);
    var displayStyle = this.state.editGateway || this.state.addSensor || this.state.deleteGateway ? 'block' : 'none';
    return (
      <div>
        <TopBar user={this.props.user} activePage='gateways'/>
        <div style={{marginTop: 25}}>
          <div className='row columns' style={{float: 'none'}}>
            <div className='callout'>
              <div className='row'>
                <div className='small-8 columns'>
                  <h3>{this.props.gateway.name}</h3>
                </div>
                <div className='small-4 columns'
                  style={{textAlign: 'right'}}>
                  <div className='button'
                    onClick={this.handleEditGateway}>
                    Edit
                </div>
                <div className='button alert'
                  style={{marginRight:0}}
                  onClick={this.handleDeleteGateway}>
                  Delete
                </div>
              </div>
              </div>
                <table style={{width: '100%'}}>
                  <tbody style={{borderWidth: 0}}>
                    {this.renderFields()}
                  </tbody>
                </table>
            </div>
            <div className='callout'>
              <div className='row'>
                <div className='small-8 columns'>
                  <h5>Attached Sensors</h5>
                </div>
                <div className='small-4 columns'
                  style={{textAlign: 'right'}}>
                  <div className='button'
                    style={{marginRight:0}}
                    onClick={this.handleAddSensor}>
                    Attach Sensor
                </div>
              </div>
              </div>
              {this.renderSensors()}
            </div>
          </div>
        </div>

        {this.state.addSensor
          ? <AddSensor cancelCallback={this.handleAddSensor}
            gateway={this.props.gateway}/>
          : null
        }
        {this.state.deleteGateway
          ? <DeleteGateway cancelCallback={this.handleDeleteGateway}
            gatewayToDelete={this.props.gateway}/>
          : null
        }
        {this.state.editGateway
          ? <EditGateway cancelCallback={this.handleEditGateway}
            gateway={this.props.gateway}/>
          : null
        }
        <div className='background-area' style={{display: displayStyle}}></div>
      </div>
    );
  }
});

module.exports = SingleGateway;
