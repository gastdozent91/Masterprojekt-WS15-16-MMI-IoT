var React = require('react')
  , request = require('superagent');

var NewCluster = React.createClass({

  propTypes: {
    handleNew: React.PropTypes.func,
    user: React.PropTypes.object
  },

  getInitialState: function() {
    console.log(this.props.user);
    return {
      name: '',
    };
  },

  handleChange: function() {
    this.setState({name: this.refs.name.value});
  },

  handleCancel: function() {
    this.props.handleNew();
  },

  handleSave: function() {
    var that = this;
    if (this.state.name) {
      var json = {
        name: this.state.name,
        owner: this.props.user.username,
        creationDate: new Date().toISOString().toString()
      };
      request
        .post('/cluster')
        .send(json)
        .end(function(err, res) {
          if (err) return console.log(err);
          //TODO: add warning
          //res.body === statuscode
          console.log(res);
          window.location.pathname = '/clusters';
        });
    }
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-8 large-centered columns'>
          <h2>Add a Cluster</h2>
          <div className='row'>
            <div className='large-4 columns'>
              Name
            </div>
            <div className='large-8 columns'>
              <input type='text'
                placeholder='supercool Cluster name'
                onChange={this.handleChange}
                ref='name' />
            </div>
          </div>
          <div className='row column' style={{textAlign: 'end'}}>
            <input type='button'
              className='button'
              value='Save'
              onClick={this.handleSave} />
            <input type='button'
              className='alert button'
              value='Cancel'
              style={{marginRight: 0}}
              onClick={this.handleCancel} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = NewCluster;

