var React = require('react');

var SingleSensor = React.createClass({

  propTypes: {
    sensor: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      isLive: false,
      fields: [
        'id',
        'owner',
        'attachedGateway'
      ]
    };
  },

  handleSwitch: function() {
    var isLive = !this.state.isLive;
    console.log('is it live:', isLive);
    this.setState({isLive: isLive});
  },

  renderFields: function(){
    var that = this;
    return this.state.fields.map(function(field){
      var value = that.props.sensor[field] || 'missing';
      var text = value;
      return(
        <tr key={field}>
          <td>{field}</td>
          <td>{field === 'owner' ? <a href={"/user/" + value}>{value}</a> : value}</td>
        </tr>
      );
    });
  },

  renderClusters:function(){
    var that = this;
    return this.props.sensor['attachedClusters'].map(function(cluster){
      return(
        <div className='row' key={cluster}>
          <a href=''>
          <div className='large-12 columns selectable-row'>{cluster}</div>
</a>
      </div>
      );
    });
  },

  renderGraph: function(){
    return (
      <div className='row'>
        <div className='large-12 columns' style={{border: '1px solid black',height:300}}>super meger krasse d3 Grafik</div>
      </div>);
  },

  render: function() {
    console.log(this.props.sensor);
    return (
      <div style={{marginTop: 25}}>
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
              <h3>{this.props.sensor.name}</h3>
              <table style={{width: '100%'}}>
                <tbody style={{borderWidth: 0}}>
                  {this.renderFields()}
                </tbody>
              </table>
          </div>
        </div>
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
            <h5>attached cluster</h5>
            {this.renderClusters()}
          </div>
        </div>
        <div className='row column' style={{float:'none'}}>
          <div className='callout'>
            <div style={{textAlign: 'center'}}>
              <p style={{marginBottom: 0}}>Show live data</p>
              <div className="switch large">
                <input className="switch-input"
                  id="yes-no"
                  type="checkbox"
                  onClick={this.handleSwitch}
                  name="exampleSwitch"/>
                <label className="switch-paddle" htmlFor="yes-no">
                  <span className="show-for-sr"></span>
                  <span className="switch-active" aria-hidden="true">Yes</span>
                  <span className="switch-inactive" aria-hidden="true">No</span>
                </label>
            </div>
          </div>
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleSensor;
