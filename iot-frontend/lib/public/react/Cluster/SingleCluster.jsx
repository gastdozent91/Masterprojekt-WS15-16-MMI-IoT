var React = require('react')
  , TopBar = require('../shared/TopBar');

var SingleCluster = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    cluster: React.PropTypes.object,
    sensors: React.PropTypes.array
  },

  getInitialState: function() {
    console.log('props', this.props);
    return {
      fields:[
        ['id','ID'],
        'owner',
        ['creationDate', 'created']
      ]
    };
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
        var parts = /^([0-9]{4}-[0-9]{2}-[0-9]{2})T([0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]+)Z$/.exec(text);
        text = parts[1] + ' ' + parts[2];
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
            <th>name</th>
            <th>ID</th>
            <th>location</th>
            <th>type</th>
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
        <td>{sensor.sensorTypes.join(', ')}</td>
      </tr>
    );
  },

  handleClickOnSensor: function(id){
    return function() {
      window.location = '/sensor/' + id;
    }
  },

  render: function() {
    console.log(this.props.cluster);
    return (
      <div>
        <TopBar user={this.props.user} activePage='clusters'/>
          <div style={{marginTop: 25}}>
            <div className='row column' style={{float: 'none'}}>
              <div className='callout'>
                <h3>{this.props.cluster.name}</h3>
                <table style={{width: '100%'}}>
                  <tbody style={{borderWidth: 0}}>
                    {this.renderFields()}
                  </tbody>
                </table>
              </div>
              <div className='callout'>
                <h5>attached sensors</h5>
                {this.renderSensors()}
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = SingleCluster;
