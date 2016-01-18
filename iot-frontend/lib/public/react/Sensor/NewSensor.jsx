var React = require('react');

var NewSensor = React.createClass({

  propTypes: {
    handleNew: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      name: '',
      type: '',
      gateway: '',
      location: ''
    };
  },

  handleNameChange: function() {
    var input = this.refs.name.value;
    this.setState({name: input});
  },

  handleTypeChange: function() {
    var input = this.refs.type.value;
    this.setState({type: input});
  },

  handleGatewayChange: function() {
    var input = this.refs.gateway.value;
    this.setState({gateway: input});
  },

  handleLocationChange: function() {
    var input = this.refs.location.value;
    this.setState({location: input});
  },

  handleCancel: function() {
    this.props.handleNew();
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-8 large-centered columns'>
          <div className='row'
            onChange={this.handleNameChange}>
            <div className='large-4 columns'>
              Name
            </div>
            <div className='large-8 columns'>
              <input type='text'
                ref='name' />
            </div>
          </div>
          <div className='row'
            onChange={this.handleTypeChange}>
            <div className='large-4 columns'>
              Type
            </div>
            <div className='large-8 columns'>
              <input type='text'
                ref='type' />
            </div>
          </div>
          <div className='row'
            onChange={this.handleGatewayChange}>
            <div className='large-4 columns'>
              Gateway
            </div>
            <div className='large-8 columns'>
              <input type='text'
                ref='gateway' />
            </div>
          </div>
          <div className='row'
            onChange={this.handleLocationChange}>
            <div className='large-4 columns'>
              Location
            </div>
            <div className='large-8 columns'>
              <input type='text'
                ref='location' />
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

module.exports = NewSensor;

