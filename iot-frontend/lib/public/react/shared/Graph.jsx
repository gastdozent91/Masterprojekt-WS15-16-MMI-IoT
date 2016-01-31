var React = require('react');

var Graph = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextProps.value === this.props.value)
      return false
    else
      return true;
  },

  //componentWillReceiveProps: function(nextProps) {
  //},

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div ref='graphWindow'
        style={{border: '1px solid #bbb',height:300,padding:0}}>
      </div>
    );
  }
});

module.exports = Graph;

