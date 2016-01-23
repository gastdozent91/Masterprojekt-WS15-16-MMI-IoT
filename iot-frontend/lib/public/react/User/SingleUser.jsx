var React = require('react')
  , TopBar = require('../shared/TopBar');

var SingleUser = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    userToCheck: React.PropTypes.object
  },

  getInitialState: function() {
    return {
    };
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <div className='row column' style={{float: 'none'}}>
          <div className='callout'>
            <h5>{this.props.userToCheck.username}</h5>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SingleUser;

