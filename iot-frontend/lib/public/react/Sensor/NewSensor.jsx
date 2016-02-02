var React = require('react')
  , request = require('superagent');

var NewSensor = React.createClass({

  propTypes: {
    handleNew: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      isActive: true,
      name: '',
      sensorType: '',
      attachedGateway: '',
      attachedClusters: [],
      location: '',
      fields: [
        {name: 'name', func: this.handleNameChange, placeholder: 'Knie links'},
        {name: 'sensorType', func: this.handleSensorTypeChange, placeholder: 'ACCELERATION'},
        {name: 'attachedGateway', func: this.handleAttachedGatewayChange, placeholder: 'gateway1'},
        {name: 'attachedClusters', func: this.handleAttachedClustersChange, placeholder: 'cluser1, cluster2'},
        {name: 'location', func: this.handleLocationChange, placeholder: 'Berlin'}
      ]
    };
  },

  handleNameChange: function() {
    var input = this.refs.name.value;
    this.setState({name: input});
  },

  handleSensorTypeChange: function() {
    var input = this.refs.sensorType.value;
    this.setState({sensorType: input});
  },

  handleAttachedGatewayChange: function() {
    var input = this.refs.attachedGateway.value;
    this.setState({attachedGateway: input});
  },

  handleAttachedClustersChange: function() {
    var input = this.refs.attachedClusters.value;
    this.setState({attachedClusters: input});
  },

  handleLocationChange: function() {
    var input = this.refs.location.value;
    this.setState({location: input});
  },

  handleCancel: function() {
    this.props.handleNew();
  },

  handleSave: function() {
    var that = this;
    if (this.state.name &&
        this.state.sensorType &&
        this.state.attachedGateway &&
        this.state.location) {
      var json = {
        isActive: true,
        name: this.state.name,
        sensorType: this.state.sensorType,
        //attachedGateway: this.state.attachedGateway,
        attachedGateway: "d95e5a53-adff-490c-b0a3-7ec539a81c7f",
        attachedClusters: [],
        location: this.state.location
      };
      request
        .post('/sensor')
        .send(json)
        .end(function(err, res) {
          if (err) return console.log(err);
          //TODO: add warning
          //res.body === statuscode
          console.log(res);
          that.props.handleNew();
        });
    }
  },

  renderFields: function() {
    var that = this;
    //TODO: show a gateway list to pick
    return this.state.fields.map(function(field) {
      return (
        <div className='row'
          key={field.name}
          onChange={field.func}>
          { field.name !== 'role'
          ? <div>
              <div className='large-4 columns'>
              {field.name}
              </div>
              <div className='large-8 columns'>
                <input type='text'
                  placeholder={field.placeholder}
                  ref={field.name} />
              </div>
            </div>
          : <div>
              <div className='large-4 columns'>
                 {field.name}
               </div>
               <div className='large-8 columns'>
                 <span>Admin </span>
                 <input type='checkbox'
                   checked={that.state.isAdmin}
                   onChange={that.handleAdminClick}
                   ref='checkAdmin'/>
              </div>
            </div>
          }
        </div>
      );
    });
  },

  render: function() {
    return (
      <div className='row'>
        <div className='large-8 large-centered columns'>
          <h2>Add a Sensor</h2>
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

module.exports = NewSensor;
