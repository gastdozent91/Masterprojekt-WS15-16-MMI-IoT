var React = require('react')
  , _ = require('underscore')
  , request = require('superagent');

var EditSensor = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    sensor: React.PropTypes.object
  },

  getInitialState: function() {
    this.loadClusters();
    this.loadGateways();
    var sensor = _.clone(this.props.sensor);
    sensor.types = sensor.types.join(', ');
    return {
      sensor: sensor,
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
    var json = _.clone(this.state.sensor);
    var types = json.types.split(',');
    types = types.map(function(type) {
      return type.trim();
    });
    json.types = types;
    console.log(json);
    request.put('/sensor')
    .send(json)
    .end(function(err, res) {
      console.log('hallo');
      console.log(err);
      console.log(res);
    });
  },

  handleNameChange: function(event){
    var sensor = _.clone(this.state.sensor);
    sensor.name = this.refs.name.value;
    this.setState({
      sensor: sensor
    });
  },

  handleLocationChange: function(event){
    var sensor = _.clone(this.state.sensor);
    sensor.location = this.refs.location.value;
    this.setState({
      sensor: sensor
    });
  },

  handleTypesChange: function(event){
    var sensor = _.clone(this.state.sensor);
    sensor.types = this.refs.types.value;
    this.setState({
      sensor: sensor
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
        <td><input type='radio' style={{margin:0}}></input></td>
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
        <td><input type='radio' style={{margin:0}}></input></td>
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
            <input type='text' value={this.state.sensor.name} ref='name' onChange={this.handleNameChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-4 column'>
            location
          </div>
          <div className='small-8 column'>
            <input type='text' value={this.state.sensor.location} ref='location' onChange={this.handleLocationChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-4 column'>
            sensor types
          </div>
          <div className='small-8 column'>
            <input type='text' value={this.state.sensor.types} ref='types' onChange={this.handleTypesChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-12 column'>
            attached gateway
          </div>
          {this.renderGateways()}
        </div>
        <div className='row columns' style={{float:'none'}}>
          <div className='small-12 column'>
            attached cluster
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
              <div className='button alert' onClick={this.props.cancelCallback}>cancel</div>
              <div className='button' onClick={this.handleSaveClick}>save</div></div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EditSensor;
