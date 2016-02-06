var React = require('react')
  , TopBar = require('../shared/TopBar');

var AddSensor = require('./AddSensor')
  , EditCluster = require('./EditCluster')
  , DeleteCluster = require('./DeleteCluster');

var SingleCluster = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    cluster: React.PropTypes.object,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      fields:[
        ['id','ID'],
        ['creationDate', 'Creation Date'],
        ['owner', 'Owner']
      ],
      addingSensor: false,
      editCluster: false,
      deleteCluster: false
    };
  },

  handleAddSensor: function(){
    this.setState({addingSensor:  !this.state.addingSensor});
  },

  handleEditCluster: function(){
    this.setState({editCluster: !this.state.editCluster});
  },

  handleDeleteCluster: function(){
    this.setState({deleteCluster: !this.state.deleteCluster});
  },

  renderFields: function(){
    var that = this;
    return this.state.fields.map(function(field){
      var value;
      var caption;
      var id;
      if(Array.isArray(field)){
        id = field[0];
        value = that.props.cluster[field[0]] || 'missing';
        caption = field[1];
      }else{
        value = that.props.cluster[field] || 'missing';
        caption = field;
        id = field;
      }
      var text = value;
      if(id === 'creationDate'){
        var date = new Date(text);
        text = date.toUTCString();
      }
      return(
        <tr key={caption}>
          <td>{caption}</td>
          <td>{id === 'owner' ? <a href={"/user/" + text}>{text}</a> : text}</td>
        </tr>
      );
    });
  },

  renderSensors: function(){
    var that = this;
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
    )
    /*return this.props.sensors.map(function(sensor){
      return (
        <div className='row' key={sensor.id}>
          <a href={'/sensor/' + sensor.id}>
            <div className='large-12 columns selectable-row'>{sensor.name}</div>
          </a>
        </div>
      );
    });*/
  },

  renderSensor: function(sensor){
    return(
      <tr className='selectable-row' style={{cursor: 'pointer'}} onClick={this.handleClickOnSensor(sensor.id)} key={sensor.id}>
        <td>{sensor.name}</td>
        <td>{sensor.id}</td>
        <td>{sensor.location}</td>
        <td>{sensor.types.join(', ')}</td>
      </tr>
    );
  },

  handleClickOnSensor: function(id){
    return function() {
      window.location = '/sensor/' + id;
    }
  },

  render: function() {
    var displayStyle = this.state.addingSensor || this.state.editCluster || this.state.deleteCluster? 'block' : 'none';
    return (
      <div>
        <TopBar user={this.props.user} activePage='clusters'/>
          <div style={{marginTop: 25}}>
            <div className='row column' style={{float: 'none'}}>
              <div className='callout'>
                <div className='row'>
                  <div className='small-8 columns'>
                    <h3>{this.props.cluster.name}</h3>
                  </div>
                  <div className='small-4 columns'
                    style={{textAlign: 'right'}}>
                    <div className='button'
                      onClick={this.handleEditCluster}>
                      Edit
                  </div>
                  <div className='button alert'
                    style={{marginRight:0}}
                    onClick={this.handleDeleteCluster}>
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
                    <div onClick={this.handleAddSensor}
                      style={{marginRight:0}}
                      className='button'>
                      Attach Sensor
                  </div>
                </div>
                </div>
                {this.renderSensors()}
              </div>
            </div>
          </div>

          {this.state.addingSensor
            ? <AddSensor cancelCallback={this.handleAddSensor}
              cluster={this.props.cluster}/> 
            : null
          }
          {this.state.deleteCluster
            ? <DeleteCluster cancelCallback={this.handleDeleteCluster}
              clusterToDelete={this.props.cluster}/>
            : null
          }
          {this.state.editSensor
            ? <EditCluster cancelCallback={this.handleEditCluster}
              cluster={this.props.cluster}/>
            : null
          }
          <div className='background-area' style={{display: displayStyle}}></div>
        </div>
    );
  }
});

module.exports = SingleCluster;
