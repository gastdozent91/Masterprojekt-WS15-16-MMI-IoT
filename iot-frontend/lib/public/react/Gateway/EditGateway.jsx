var React = require('react')
  , request = require('superagent');

var EditGateway = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    gateway: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      name: ''
    };
  },

  handleSaveClick: function(){
    var that = this;
    if (this.state.name) {
      var json = {
        name: this.state.name,
        owner: this.props.gateway.owner
      };
      request.put('/gateway/' + this.props.gateway.id)
      .send(json)
      .end(function(err, res) {
        if (err) return console.log(err);
        window.location.pathname = '/gateways';
      });
    }
  },

  handleChange: function(){
    this.setState({
      name: this.refs.name.value
    });
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>Edit Cluster: {this.props.gateway.name}</h2>
        <div className="body">
          <div className='row columns'>
            <div className='small-4 column'>
              name
            </div>
            <div className='small-8 column'>
              <input type='text'
                value={this.state.name}
                ref='name'
                placeholder={this.props.gateway.name}
                onChange={this.handleChange}/>
            </div>
          </div>
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

module.exports = EditGateway;
