var React = require('react');

var DynamoArrow = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <div ref='renderWindow'
        style={{border: '1px solid #bbb',height:300,padding:0,background:'#ddd'}}>
      </div>
    );
  }
});

module.exports = DynamoArrow;

