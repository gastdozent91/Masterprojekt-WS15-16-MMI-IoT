var React = require('react')
  , TopBar = require('../shared/TopBar');

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
        'name',
        'owner'
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
    );
  },

  renderSensor: function(sensor){
    return (
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
    console.log(this.props.gateway);
    return (
      <div>
        <TopBar user={this.props.user} activePage='gateways'/>
        <div style={{marginTop: 25}}>
          <div className='row columns' style={{float: 'none'}}>
            <div className='callout'>
              <h3>{this.props.gateway.name}</h3>
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

module.exports = SingleGateway;
