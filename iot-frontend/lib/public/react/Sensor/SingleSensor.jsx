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
        'name',
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
      var value = that.props.sensor[field] || '';
      var text;
      return(
        <div className='row' key={field}>
          <div className='large-4 columns'>{field}</div>
          <div className='large-8 columns'>{value}</div>
        </div>
      );
    });
  },

  renderClusters:function(){
    var that = this;
    return this.props.sensor['attachedClusters'].map(function(cluster){
      return(
        <div className='row' key={cluster}>
          <div className='large-12 columns'>{cluster}</div>
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
      <div>
        <div style={{textAlign: 'center', marginTop: 20}}>
          <p style={{marginBottom: 0}}>Is it live data?</p>
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
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
            <h5>{this.props.sensor.name}</h5>
            {this.renderFields()}
            <h3>cluster</h3>
            {this.renderClusters()}
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleSensor;
