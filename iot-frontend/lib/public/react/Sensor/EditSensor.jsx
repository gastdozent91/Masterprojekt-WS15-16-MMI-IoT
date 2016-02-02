var React = require('react')
  , request = require('superagent');

var EditSensor = React.createClass({

  propTypes: {
    cancleCallback: React.PropTypes.func,
    sensor: React.PropTypes.object
  },

  getInitialState: function() {
    this.loadClusters();
    this.loadGateways();
    return {
      nameValue: this.props.sensor.name,
      locationValue: this.props.sensor.location,
      sensorTypesValue: this.props.sensor.types.join(', '),
      attachedGatewayValue: this.props.sensor.attachedGateway,
      attachedClusterValue: this.props.sensor.attachedCluster,
      clusters: [],
      gateways: []
    };
  },

  loadClusters: function(){
    var that = this;
    request
      .get('/api/cluster')
      .end(function(err, res){
        if(err)return console.log(err);

        that.setState({clusters: res.body})
      });
  },

  loadGateways: function(){
    var that = this;
    request
      .get('/api/gateway')
      .end(function(err, res){
        if(err)return console.log(err);

        that.setState({gateways: res.body})
      });
  },

  handleSaveClick: function(){
    //TODO send new data to backend

    //TODO clone
    var json = this.props.sensor;
  },

  handleNameChange: function(event){
    this.setState({
      nameValue: this.refs.name.value,
      locationValue: this.refs.location.value,
      sensorTypesValue: this.refs.types.value,
      attachedGatewayValue: this.refs.attachedGateway.value,
      attachedClusterValue: this.refs.attachedClusters.value
    });
  },

  renderGateways: function(){
    var that = this;
    return(
      <table style={{width: '100%', marginBottom: 50}}>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>id</th>
          </tr>
        </thead>

        <tbody style={{borderWidth: 0}}>
          {this.state.gateways.map(function(gateway){
            return that.renderGateway(gateway);
          })}
        </tbody>
      </table>
    );
  },

  renderGateway: function(gateway){
    return(
      <tr className='selectable-row' key={gateway.id}>
        <td><input type='radio'></input></td>
        <td>{gateway.name}</td>
        <td>{gateway.id}</td>
      </tr>
    );
  },

  renderClusters: function(){
    var that = this;
    return(
      <table style={{width: '100%', marginBottom: 50}}>
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>id</th>
          </tr>
        </thead>

        <tbody style={{borderWidth: 0}}>
          {this.state.clusters.map(function(cluster){
            return that.renderCluster(cluster);
          })}
        </tbody>
      </table>
    );
  },

  renderCluster: function(cluster){
    return(
      <tr className='selectable-row' key={cluster.id}>
        <td><input type='radio'></input></td>
        <td>{cluster.name}</td>
        <td>{cluster.id}</td>
      </tr>
    );
  },

  renderFields: function(){
    return(
      <div>
        <div className='row columns'>
          <div className='small-4 column'>
            name
          </div>

          <div className='small-8 column'>
            <input type='text' value={this.state.nameValue} ref='name' onChange={this.handleNameChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-4 column'>
            location
          </div>
          <div className='small-8 column'>
            <input type='text' value={this.state.locationValue} ref='location' onChange={this.handleNameChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-4 column'>
            sensor types
          </div>
          <div className='small-8 column'>
            <input type='text' value={this.state.sensorTypesValue} ref='types' onChange={this.handleNameChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-12 column'>
            attached gateway
          </div>
          {this.renderGateways()}
        </div>
        <div className='row columns'>
          <div className='small-12 column'>
            attaced cluster
          </div>
          {this.renderClusters()}
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>Edit Sensor: {this.props.sensor.name}</h2>
        <div className="body">
            {this.renderFields()}
          <div className='row columns' style={{marginTop: 25, textAlign: 'right'}}>
            <div className='small-12 column'>
              <div className='button alert' onClick={this.props.cancleCallback}>cancle</div>
              <div className='button' onClick={this.handleSaveClick}>save</div></div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EditSensor;
