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
      name: '',
      types: '',
      location: '',
      attachedGateway: '',
      attachedCluster: '',
      owner: '',
      creationDate: '',
      isActive: false,
      sensor: sensor,
      clusters: [],
      gateways: [],
      checkedCluster: sensor.attachedCluster,
      checkedGateway: sensor.attachedGateway
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
    var that = this;
    var types;
    if (this.state.types) {
      var types = this.state.types.split(',');
      types = types.map(function(t) {
        return t.trim();
      });
    } else {
      types = this.props.sensor.types;
    }
    var json = {
      name: this.state.name || this.props.sensor.name,
      types: types,
      location: this.state.location || this.props.sensor.location,
      attachedGateway: this.state.checkedGateway,
      attachedCluster: this.state.checkedCluster,
      owner: this.props.sensor.owner,
      creationDate: this.props.sensor.creationDate,
      isActive: true,
    };
    console.log('old', this.props.sensor);
    console.log('new', json);
    //return;
    request.put('/sensor/' + this.props.sensor.id)
    .send(json)
    .end(function(err, res) {
      if (err) return console.log(err);
      window.location.pathname = '/sensor/' + that.props.sensor.id;
    });
  },

  handleChange: function() {
    this.setState({
      name: this.refs.name.value,
      location: this.refs.location.value,
      types: this.refs.types.value
    });
  },

  changeGateway: function(id) {
    var checkedGateway = _.clone(this.state.checkGateway);
    if (checkedGateway === id)
      checkedGateway = '';
    else
      checkedGateway = id;
    this.setState({checkedGateway: checkedGateway});
  },

  changeCluster: function(id) {
    var checkedCluster = _.clone(this.state.checkCluster);
    if (checkedCluster === id)
      checkedCluster = '';
    else
      checkedCluster = id;
    this.setState({checkedCluster: checkedCluster});
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
        <td>
          <input type='radio'
            onChange={this.changeGateway.bind(this, gateway.id)}
            checked={this.state.checkedGateway === gateway.id}
            style={{margin:0}} />
        </td>
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
        <td>
          <input type='radio'
            onChange={this.changeCluster.bind(this, cluster.id)}
            checked={this.state.checkedCluster === cluster.id}
            style={{margin:0}} />
        </td>
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
            <input type='text'
              value={this.state.name}
              placeholder={this.props.sensor.name}
              ref='name'
              onChange={this.handleChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-4 column'>
            location
          </div>
          <div className='small-8 column'>
            <input type='text'
              value={this.state.location}
              placeholder={this.props.sensor.location}
              ref='location'
              onChange={this.handleChange}/>
          </div>
        </div>
        <div className='row columns'>
          <div className='small-4 column'>
            sensor types
          </div>
          <div className='small-8 column'>
            <input type='text'
              value={this.state.types}
              placeholder={this.props.sensor.types.join(', ')}
              ref='types'
              onChange={this.handleChange}/>
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
