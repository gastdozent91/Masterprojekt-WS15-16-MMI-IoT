var React = require('react')
  , request = require('superagent');

var EditCluster = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    cluster: React.PropTypes.object
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
        owner: this.props.cluster.owner,
        creationDate: this.props.cluster.creationDate
      };
      request.put('/cluster/' + this.props.cluster.id)
      .send(json)
      .end(function(err, res) {
        if (err) return console.log(err);
        window.location.pathname = '/cluster/' + that.props.cluster.id;
      });
    }
  },

  handleNameChange: function(){
    this.setState({
      name: this.refs.name.value
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
              <input type='text'
                value={this.state.name}
                placeholder={this.props.cluster.name}
                ref='name'
                onChange={this.handleNameChange}/>
            </div>
          </div>
          <div className='row columns'
            style={{marginTop: 25, textAlign: 'right'}}>
            <div className='small-12 column'>
              <div className='button alert'
                onClick={this.props.cancelCallback}>
                cancel
              </div>
              <div className='button'
                onClick={this.handleSaveClick}>
                save
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EditCluster;
