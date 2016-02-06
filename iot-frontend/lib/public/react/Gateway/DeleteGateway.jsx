var React = require('react')
  , request = require('superagent');

var DeleteGateway = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    gatewayToDelete: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  handleSaveClick: function(){
    request.delete('/gateway/' + this.props.gatewayToDelete.id)
      .end(function(err, res) {
        console.log(err, res);
        if (res.statusCode === 200) {
          window.location.pathname = '/gateways';
        }
      });
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>
          Delete Gateway: {this.props.gatewayToDelete.name} ?
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

module.exports = DeleteGateway;
