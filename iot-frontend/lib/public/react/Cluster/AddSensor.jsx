var React = require('react')
  , request = require('superagent');

var AddSensor = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    cluster: React.PropTypes.object,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    this.handleSensors();
    return {
      sensors: []
    };
  },

  handleSensors: function(){
    var that = this;
    request
      .get('/api/sensor')
      .end(function(err, res) {
        if (err) return console.log(err);

        that.setState({sensors: res.body});
      });
  },

  handleRowClick:function(ref){
    var that = this;
    return function(){
      that.refs[ref].checked = !that.refs[ref].checked;
    };
  },

  handleSaveClick: function(){
    var that = this;
    // TODO clone
    this.state.sensors.map(function(sensor){
      var json = sensor;
      if(that.refs['check' + sensor.id].checked){
        json.attachedCluster = that.props.cluster.id;
      }else{
        json.attachedCluster = null;
      }
        request
          .put('/sensor/' + sensor.id)
          .send(json)
          .end(function(err, res){
            if(err) return;

            console.log(res);
          });
    });
  },

  renderSensors: function(){
    var that = this;

    return this.state.sensors.map(function(sensor){
      var ty = sensor.types || [];
      return(
        <tr className='selectable-row' key={sensor.id} onClick={that.handleRowClick('check' + sensor.id)}>
          <td valign='middle'><input ref={'check' + sensor.id} type='checkbox' checked={sensor.attachedCluster === that.props.cluster.id ? 'checked' : null}></input></td>
          <td>{sensor.name}</td>
          <td>{sensor.id}</td>
          <td>{sensor.location}</td>
          <td>{ty.join(', ')}</td>
        </tr>
      );
    });
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>Add Sensor to Cluster: {this.props.cluster.name}</h2>
        <div className="body">
          <table style={{width: '100%'}}>
              <thead>
              <tr>
                <th></th>
                <th>name</th>
                <th>ID</th>
                <th>location</th>
                <th>type</th>
              </tr>
            </thead>
            <tbody style={{borderWidth: 0}}>
              {this.renderSensors()}
            </tbody>
          </table>
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

module.exports = AddSensor;
