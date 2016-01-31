var React = require('react')
  , d3 = require('d3');

var format
  , firstfn
  , dateFn
  , x
  , y
  , svg
  , xAxis
  , yAxis;

var Graph = React.createClass({

  propTypes: {
    value: React.PropTypes.object,
    data: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      spanClass: {minWidth: 20},
      created: false,
      max: '2016-01-18 18:00:08.435',
      data: [],
    };
  },

  //shouldComponentUpdate: function(nextProps, nextState) {
    //if (nextProps.value === this.props.value)
      //return false
    //else
      //return true;
  //},

  componentWillReceiveProps: function(nextProps) {
    var newData = this.state.data.concat([nextProps.value]);
    if (newData.length > 1000)
      newData.splice(0, 1);
    this.setState({data: newData}, function() {
      if (this.state.created) {
        this.refresh();
      } else {
        this.create();
      }
    });
  },

  componentDidMount: function() {
  },

  create: function() {
    format = d3.time.format('%Y-%m-%d %H:%M:%S.%L');
    firstfn = function(d) { return d.acceleration[0]; }
    dateFn = function(d) {
      //console.log('d', d);
      //console.log(format.parse(d.date));
      return format.parse(d.time);
    }
    var max = format.parse(this.state.max);
    x = d3.time.scale()
      .range([10, this.refs.graphWindow.offsetWidth - 20])
      .domain(d3.extent(this.props.all, dateFn))
      //.domain([d3.min(this.state.data, dateFn), max])

    y = d3.scale.linear()
      .range([280, 10])
      .domain(d3.extent(this.props.all, firstfn))
      //.domain([d3.min(this.state.data, firstfn), 1])

    xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format("%H:%M:%S"))
      .orient("bottom");

    yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(this.refs.graphWindow.offsetWidth)
      .orient("right");

    svg = d3.select("#graphWindow").append("svg:svg")
      .attr("width", this.refs.graphWindow.offsetWidth)
      .attr("height", 300)

    var gx = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 280 + ")")
      .call(xAxis)
      .call(this.customXAxis);


    var gy = svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .call(this.customAxis);

    svg.selectAll("circle").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('color', '#ff0000')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(firstfn(d)) }) 

    this.setState({created: true});
    this.refresh();
  },

  customAxis: function(g) {
    g.selectAll("text")
        .attr("x", 4)
        .attr("dy", -4);
  },

  customXAxis: function(g) {
    g.selectAll("text")
        .attr("font-size", 10);
  },

  refresh: function() {
    //x.domain(d3.extent(this.state.data, dateFn))
    //y.domain(d3.extent(this.state.data, firstfn))
    svg.selectAll("circle").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(firstfn(d)) }) 
  },

  render: function() {
    //console.log(this.state.data[0].date.getTime());
    return (
      <div ref='graphWindow'
        id='graphWindow'
        style={{border: '1px solid #bbb',height:300,padding:0}}>
      </div>
    );
  }
});

module.exports = Graph;

