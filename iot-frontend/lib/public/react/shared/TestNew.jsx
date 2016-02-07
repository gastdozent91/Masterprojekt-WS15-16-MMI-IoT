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

var blaDate;

var TestNew = React.createClass({

  propTypes: {
    value: React.PropTypes.object,
    data: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      spanClass: {minWidth: 20},
      created: false,
      max: '2016-01-18T18:00:08.435',
      data: [[], [], []],
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
    //console.log('state', this.state);
    //console.log('props', nextProps);
    //var newAll = nextProps.all[0];
    //var newAll2 = nextProps.all[1];
    //var newAll3 = nextProps.all[2];
    //var newAll = this.state.all[0].concat(nextProps.all[0]);
    //var newAll2 = this.state.all[1].concat(nextProps.all[1]);
    //var newAll3 = this.state.all[2].concat(nextProps.all[2]);
    //var remove = newAll.length - 400;
    //newAll.splice(0, remove);
    //newAll2.splice(0, remove);
    //newAll3.splice(0, remove);
    var x = { value: nextProps.value.value[0], time: nextProps.value.time, color: '#E83A25'};
    var y = { value: nextProps.value.value[1], time: nextProps.value.time, color: '#98CC96'};
    var z = { value: nextProps.value.value[2], time: nextProps.value.time, color: '#004563'};
    var newDataX = this.state.data[0].concat([x]);
    var newDataY = this.state.data[1].concat([y]);
    var newDataZ = this.state.data[2].concat([z]);
    if (newDataX.length > 400) {
      newDataX.splice(0, 1);
      newDataY.splice(0, 1);
      newDataZ.splice(0, 1);
    }
    this.setState({data: [newDataX, newDataY, newDataZ]}, function() {
      if (this.state.created) {
        this.refreshGraph();
      } else {
        this.createGraph();
      }
    });
  },

  createGraph: function() {
    var that = this;
    //var margin = {top: 20, right: 0, bottom: 20, left: 34}
      //, width = this.props.dimension[0] - margin.right - margin.left
      //, height = this.props.dimension[1] - margin.top - margin.bottom;

    format = d3.time.format('%Y-%m-%dT%H:%M:%S.%L');
    var amountFn = function(d) { return d.value }
    var dateFn = function(d) { return format.parse(d.time) }
    blaDate = function(d) {
      return new Date((+format.parse(d.time) + 10000));
    } 

    var x = d3.time.scale()
      .range([10, this.refs.graphWindow.offsetWidth - 20])
      //.domain(d3.extent(that.state.data[0], dateFn));
      //.domain([d3.min(this.state.data[0], dateFn), d3.max(this.props.maxDate, dateFn)]);
      .domain([d3.min(this.state.data[0], dateFn), dateFn(this.props.maxDate)]);
      //.domain([d3.min(this.state.data[0], dateFn), d3.max(this.state.data[0], blaDate)]);

    var y = d3.scale.linear()
      .range([260, 20])
      .domain([-10, 10]);
      //.domain(d3.extent(this.state.data[0], amountFn));

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
      .tickFormat(d3.time.format("%S.%L"))
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(this.refs.graphWindow.offsetWidth)
      .orient("right");

    var svg = d3.select("#graphWindow").append("svg")
        .attr("width", this.refs.graphWindow.offsetWidth)
        .attr("height", 280)
      .append("g")
        .attr("transform", "translate(" + 10 + "," + 10 + ")");

    svg.append("text")
      .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
      .attr("transform", "translate(" + (-17) + "," + (280 / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
      .attr("font-size", "14px")
      .text("Measurements per message");

    var gx = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + 253 + ")")
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

    this.setState({
      //height: height,
      //width: width,
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
      created: true,
      svg: svg
    });
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
    //var lastRefresh = this.state.lastRefresh ?
      //this.state.lastRefresh :
      //this.state.startTime;

    var that = this
      , svg = this.state.svg
      //, height = this.state.height
      //, width = this.state.width
      , x = this.state.x
      , y = this.state.y
      //, lines = this.state.lines
      , line = this.state.line
      , aLineContainer = this.state.aLineContainer
      , xAxis = this.state.xAxis
      , yAxis = this.state.yAxis
      , gx = this.state.gx
      , gy = this.state.gy;

    //var xMin = this.state.data[0];
    //var xMax = this.state.data[0][this.state.data.length - 1];
    //x.domain(d3.extent(this.state.data[0], this.state.dateFn));
    x.domain([d3.min(this.state.data[0], this.state.dateFn), this.state.dateFn(this.props.maxDate)]);
    //x.domain([d3.min(this.state.data[0], this.state.dateFn), d3.max(this.state.data[0], blaDate)]);


    aLineContainer.selectAll('path').remove();

    var lines = this.state.svg.selectAll('.line').data(this.state.data);
    //var aLineContainer = lines.enter().append('g')
                           //.attr('stroke', function(d) {
                             //return '#f00'
                           //})
                           //.attr('class', 'line');
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
      <div>
        <div ref='graphWindow'
          id='graphWindow'
          style={{border: '1px solid #bbb',height:300,padding:0}}>
        </div>
        <div style={{textAlign: 'center', marginTop: 5}}>
          <span>x</span><span style={{backgroundColor: '#E83A25', width: 10, padding: '0 10', margin: '0 10'}}></span>
          <span style={{marginLeft: 20}}>y</span><span style={{backgroundColor: '#98CC96', width: 10, padding: '0 10', margin: '0 10'}}></span>
          <span style={{marginLeft: 20}}>z</span><span style={{backgroundColor: '#004563', width: 10, padding: '0 10', margin: '0 10'}}></span>
        </div>
      </div>
    );
  }
});

module.exports = TestNew;
