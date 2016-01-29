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
    return this.props.sensors.map(function(sensor){
      return (
        <div className='row' key={sensor.id}>
          <a href={'/sensor/' + sensor.id}>
            <div className='large-12 columns selectable-row'>{sensor.name}</div>
          </a>
        </div>
      );
    });
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
