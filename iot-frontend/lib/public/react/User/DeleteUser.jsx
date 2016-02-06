var React = require('react')
  , request = require('superagent');

var DeleteUser = React.createClass({

  propTypes: {
    cancelCallback: React.PropTypes.func,
    userToDelete: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  handleSaveClick: function(){
    request.delete('/user/' + this.props.userToDelete.username)
      .end(function(err, res) {
        console.log(err, res);
        if (res.statusCode === 200) {
          window.location.pathname = '/users';
        }
      });
  },

  render: function() {
    return (
      <div className='iot-modal callout'>
        <h2 id='modalTitle'>
          Delete User: {this.props.userToDelete.username} ?
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

module.exports = DeleteUser;

