var React = require('react')
  , request = require('superagent');

var DeleteCluster = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    clusterToDelete: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  handleSaveClick: function(){
    request.delete('/cluster/' + this.props.clusterToDelete.id)
      .end(function(err, res) {
        console.log(err, res);
        if (res.statusCode === 200) {
          window.location.pathname = '/clusters';
        }
      });
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>
          Delete Cluster: {this.props.clusterToDelete.name} ?
        </h2>
        <div className="body">
          <div className='row columns'
            style={{marginTop: 25, textAlign: 'right'}}>
            <div className='small-12 column'>
              <div className='button alert'
                onClick={this.props.cancelCallback}>
                no
              </div>
              <div className='button'
                onClick={this.handleSaveClick}>
                yes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = DeleteCluster;


