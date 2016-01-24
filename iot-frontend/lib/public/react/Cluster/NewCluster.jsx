var React = require('react');

var NewCluster = React.createClass({

  propTypes: {
    handleNew: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      name: '',
      sensorList: [],
      fields: [{name: 'name', func: this.handleNameChange}]
    };
  },

  handleNameChange: function() {
    var input = this.refs.name.value;
    console.log('name', input);
    this.setState({name: input});
  },

  handleCancel: function() {
    this.props.handleNew();
  },

  renderFields: function() {
    return this.state.fields.map(function(field) {
      return (
        <div className='row'
          key={field.name}
          onChange={field.func}>
          <div className='large-4 columns'>
            {field.name}
          </div>
          <div className='large-8 columns'>
            <input type='text'
              ref={field.name} />
          </div>
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-8 large-centered columns'>
          {this.renderFields()}
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

