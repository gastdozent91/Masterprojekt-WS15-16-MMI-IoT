var React = require('react')
  , request = require('superagent');

var EditCluster = React.createClass({

  propTypes: {
    cancleCallback: React.PropTypes.func,
    cluster: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      value: this.props.cluster.name
    };
  },

  handleSaveClick: function(){
    //TODO send new data to backend
    var json = this.props.cluster;
    json.name = this.refs['name'].value;

    console.log(json);
    this.props.cancleCallback();
  },

  handleNameChange: function(event){
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>Edit Cluster: {this.props.cluster.name}</h2>
        <div className="body">
          <div className='row columns'>
            <div className='small-4 column'>
              name
            </div>
            <div className='small-8 column'>
              <input type='text' value={this.state.value} ref='name' onChange={this.handleNameChange}/>
            </div>
          </div>
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

module.exports = EditCluster;
