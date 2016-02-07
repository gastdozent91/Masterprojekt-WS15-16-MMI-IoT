var React = require('react');

var Footer = React.createClass({

  propTypes: {
  },

  getInitialState: function() {
    return {
      pClass: ''
    };
  },

  componentDidMount: function() {
    var shouldAnimate = this.refs.text.getBoundingClientRect().top < window.innerHeight;
    var go = function() {
      shouldAnimate = this.refs.text.getBoundingClientRect().top < window.innerHeight;
      if (shouldAnimate) {
        this.setState({pClass: 'show'});
        window.removeEventListener('scroll', go);
      }
    }.bind(this);

    if (shouldAnimate) {
      this.setState({pClass: 'show'});
    } else {
      window.addEventListener('scroll', go);
    }
  },

  render: function() {
    return (
      <div>
        <p ref='text'
          className={this.state.pClass}>
          FRISS das! Eure freundliche Masterprojekt Gruppe.
        </p>
      </div>
    );
  }
});

module.exports = Footer;

