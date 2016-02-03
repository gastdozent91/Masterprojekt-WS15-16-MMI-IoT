var React = require('react')
  , d3 = require('d3');

var format
  , firstfn, secondfn, thirdfn
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
      max: '2016-01-18T18:00:08.435',
      data: [],
      all: this.props.all
    };
  },

  //shouldComponentUpdate: function(nextProps, nextState) {
    //if (nextProps.value === this.props.value)
      //return false
    //else
      //return true;
  //},

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value === null) return;
    var newAll = this.state.all.concat(nextProps.all);
    if (newAll.length > 400)
      newAll.splice(0, 100);
    var newData = this.state.data.concat([nextProps.value]);
    if (newData.length > 400)
      newData.splice(0, 1);
    this.setState({data: newData, all: newAll}, function() {
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
    format = d3.time.format('%Y-%m-%dT%H:%M:%S.%L');
    firstfn = function(d) { return d.acceleration[0]; }
    secondfn = function(d) { return d.acceleration[1]; }
    thirdfn = function(d) { return d.acceleration[2]; }
    dateFn = function(d) {
      //console.log('d', d);
      //console.log(format.parse(d.date));
      return format.parse(d.time);
    }
    var max = format.parse(this.state.max);
    x = d3.time.scale()
      .range([10, this.refs.graphWindow.offsetWidth - 20])
      .domain(d3.extent(this.state.all, dateFn))
      //.domain([d3.min(this.state.data, dateFn), max])

    y = d3.scale.linear()
      .range([280, 10])
      .domain(d3.extent(this.state.all, firstfn))
      //.domain([d3.min(this.state.data, firstfn), 1])

    xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format("%S.%L"))
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

    svg.selectAll("circle.blue").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('class', 'blue')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(firstfn(d)) }) 

    svg.selectAll("circle.red").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('class', 'red')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(secondfn(d)) }) 

    svg.selectAll("circle.green").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('class', 'green')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(thirdfn(d)) }) 

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
    x.domain(d3.extent(this.state.all, dateFn))
    y.domain(d3.extent(this.state.all, firstfn))
    svg.selectAll("circle.blue").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('class', 'blue')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(firstfn(d)) }) 

    svg.selectAll("circle.red").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('class', 'red')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(secondfn(d)) }) 

    svg.selectAll("circle.green").data(this.state.data).enter()
      .append("svg:circle")
      .attr("r", 2)
      .attr('class', 'green')
      .attr("cx", function(d) { return x(dateFn(d)) })
      .attr("cy", function(d) { return y(thirdfn(d)) }) 
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

