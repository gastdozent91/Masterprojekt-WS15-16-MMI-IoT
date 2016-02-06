var React = require('react')
  , _ = require('underscore')
  , request = require('superagent');

var AddSensor = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    gateway: React.PropTypes.object,
  },

  getInitialState: function() {
    //var that = this;
    this.handleSensors();
    return {
      sensors: [],
      checkedSensors: {}
    };
  },

  handleSensors: function(){
    var that = this;
    request
      .get('/api/sensor')
      .end(function(err, res) {
        if (err) return console.log(err);
        var checkedSensors = {};
        res.body.map(function(sensor) {
          var isChecked = sensor.attachedGateway === that.props.gateway.id;
          checkedSensors[sensor.id] = isChecked;
        });
        that.setState({sensors: res.body, checkedSensors: checkedSensors});
      });
  },

  handleChange: function(id) {
    var checkedSensors = _.clone(this.state.checkedSensors);
    checkedSensors[id] = !checkedSensors[id];
    this.setState({checkedSensors: checkedSensors});
  },

  handleSaveClick: function(){
    var that = this;

    //TODO clone
    this.state.sensors.map(function(sensor){
      var json = sensor;
      if (that.refs['check' + sensor.id].checked) {
        json.attachedGateway = that.props.gateway.id;
        request
          .put('/sensor/' + sensor.id)
          .send(json)
          .end(function(err, res){
            if(err) return;
            window.location.pathname = '/gateway/' + that.props.gateway.id;
          });
      }
    });
  },

  renderSensors: function(){
    var that = this;

    return this.state.sensors.map(function(sensor){
      var ty = sensor.types || [];
      return(
        <tr className='selectable-row'
          key={sensor.id}>
          <td valign='middle'>
            <input ref={'check' + sensor.id}
              type='checkbox'
              onChange={that.handleChange.bind(that, sensor.id)}
              checked={that.state.checkedSensors[sensor.id]} />
          </td>
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
        <h2 id='modalTitle'>Add Sensor to Cluster: {this.props.gateway.name}</h2>
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
