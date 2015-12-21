var React = require('react')
  , d3 = require('d3')
  , rabbit = require('../js/rabbit');

var Chart = React.createClass({

  getInitialState: function() {
    return {
      data: [],
      startTime: Date.now()
    };
  },

  componentDidMount: function() {
    this.update();
  },

  update: function() {
    var that = this;
    setTimeout(function() {
      setInterval(function() {
        var data = rabbit.getTest();
        if (data && data.length) {
          that.setState({data: data}, function() {
            if (that.state.isGraphCreated)
              that.refreshGraph();
            else
              that.createGraph();
          });
        }
      }, 25);
    }, 1000);
  },

  createGraph: function() {
    var that = this;
    var margin = {top: 20, right: 0, bottom: 20, left: 34}
      , width = this.props.dimension[0] - margin.right - margin.left
      , height = this.props.dimension[1] - margin.top - margin.bottom;

    var amountFn = function(d) { return d.value }
    var dateFn = function(d) { return (d.time) }

    var x = d3.time.scale()
      .range([0, width])
      .domain(d3.extent(that.state.data[0], dateFn));

    var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, 200]);

    var line = d3.svg.line()
      .x(function(d) {
        return x(dateFn(d));
      })
      .y(function(d) {
        return y(amountFn(d));
      })
      .interpolate('monotone');

    var xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format("%H:%M:%S"))
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(width)
      .orient("right");

    var svg = d3.select("#graph").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + (-17) + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .attr("font-size", "14px")
      .text("Measurements per message");

    var gx = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .call(that.customXAxis);


    var gy = svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .call(that.customAxis);

    var lines = svg.selectAll('.line').data(this.state.data);

    var aLineContainer = lines.enter().append('g')
                           .attr('stroke', function(d) {
                             return d[0].color
                           })
                           .attr('class', 'line');

    aLineContainer.append('path')
      .attr('d', line);

    this.setState({height: height,
                   width: width,
                   dateFn: dateFn,
                   amountFn: amountFn,
                   x: x,
                   y: y,
                   line: line,
                   lines: lines,
                   aLineContainer: aLineContainer,
                   xAxis: xAxis,
                   yAxis: yAxis,
                   gx: gx,
                   gy: gy,
                   isGraphCreated: true,
                   svg: svg});
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


  refreshGraph: function() {
    var lastRefresh = this.state.lastRefresh
                      ? this.state.lastRefresh
                      : this.state.startTime;

    var that = this
      , svg = this.state.svg
      , height = this.state.height
      , width = this.state.width
      , x = this.state.x
      , y = this.state.y
      , lines = this.state.lines
      , line = this.state.line
      , aLineContainer = this.state.aLineContainer
      , xAxis = this.state.xAxis
      , yAxis = this.state.yAxis
      , gx = this.state.gx
      , gy = this.state.gy;

    var xMin = this.state.data[0];
    var xMax = this.state.data[0][this.state.data.length - 1];
    x.domain(d3.extent(this.state.data[0], this.state.dateFn));

    aLineContainer.selectAll('path').remove();

    aLineContainer.append('path')
      .attr('d', line);

    xAxis.scale(x);
    yAxis.scale(y);

    gx.transition()
      .call(xAxis);

    gx.call(xAxis).call(that.customXAxis);

    gy.transition()
      .call(yAxis)
      .call(that.customAxis);

    gy.call(that.customAxis);

    this.setState({svg: svg,
                   x: x,
                   y: y,
                   line: line,
                   lines: lines,
                   aLineContainer: aLineContainer,
                   xAxis: xAxis,
                   yAxis: yAxis,
                   gx: gx,
                   gy: gy});
  },

  render: function() {
    return (
      <div id='graph'
           className='aGraph'
           style={{height: this.props.dimension[1]}}>
      </div>
    );
  }
});

module.exports = Chart;
