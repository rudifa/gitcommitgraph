const d3 = require('d3');

var plot_git_log = function(nodes_and_arcs) {

  // console.log('plot_git_log:', nodes_and_arcs);
  // console.log('plot_git_log:', nodes_and_arcs.nodes[0]);

  const rowWidth = 700;
  const rowHeight = 25;
  const colSpacing = 20;

  // define scaling functions for col, row
  var sx = d3.scaleLinear()
      .domain([0, 1]) // row
      .range([colSpacing, 2 * colSpacing]); // x

  var sy = d3.scaleLinear()
      .domain([0, 1]) // col
      .range([0.5 * rowHeight, 1.5 * rowHeight]); // y

  var chart = d3.select(".chart")
      .attr("width", rowWidth)
      .attr("height", rowHeight * nodes_and_arcs.nodes.length);

  var bar = chart.selectAll("g")
      .data(nodes_and_arcs.nodes)
      .enter().append("g")
      //&.attr("transform", function(d, i) { return "translate(0," + i * rowHeight + ")"; });
      .attr("transform", function(d, i) { return "translate(0," + sy(d.row - 0.5) + ")"; });

  bar.append("rect")
      .attr("width", rowWidth)
      .attr("height", rowHeight - 1);

  bar.append("text")
      .attr("x", 3 * colSpacing)
      .attr("y", rowHeight / 2)
      .attr("dy", ".35em") // adjust vertical position of text in bar
      .text(function(d) { return d.commit.sha + '  ' + d.commit.summary + '  ' + d.commit.date + '  ' + d.commit.author; });

  var plot_nodes = function(nodes) {
          chart.selectAll('.node')
					.data(nodes)
					.enter().append('circle')
					.attr('r', 4)
					.attr('cx', function(d) { return sx(d.col); })
					.attr('cy', function(d) { return sy(d.row); })
					.attr('stroke', 'black')
          .attr('fill', 'white');
  }


  // return svg command sequence for straight line from p0 to p1
  function path_L(d) {
    //console.log(d);
  	var p0 = d[0],
    		p1 = d[1];
  	var s = "M" + sx(p0.col) + "," + sy(p0.row)
      + " L" + sx(p1.col) + "," + sy(p1.row);
    //console.log(s);
    return s;
  }

  // return svg command sequence for quadratic bezier line from p0 to p1
  // with control point at the same row as one of endpoints
  function path_Q(d) {
    //console.log(d);
  	var p0 = d[0],
    		p1 = d[1];
    var pc = (p1.col >= p0.col) ? {col: p1.col, row: p0.row} : {col: p0.col, row: p1.row};
  	var s = "M" + sx(p0.col) + "," + sy(p0.row)
      + " Q" + sx(pc.col) + "," + sy(pc.row)
      + " " + sx(p1.col) + "," + sy(p1.row);
    return s;
  }

  // return svg command sequence for a combined curve (optional linear + quadratic Bezier)
  // from p0 to p1, where these points define a diagonal of a rectangle;
  // limit the vertical extent of Bezier to 1 internode distance
  function path_QL(d) {
  	var p0 = d[0],
    		p1 = d[1];
  	if (p1.row - p0.row > 1 && p1.col != p0.col) {
    	// vertical path > 1:
    	// create an intermediate point pi and split arc in L and Q parts
    	if (p1.col > p0.col) {
      	var pi = {col: p1.col, row: p0.row + 1};
      	sql = path_Q([p0, pi]) + ' ' + path_L([pi, p1]);
        return sql;
      } else {
       	var pi = {col: p0.col, row: p1.row - 1};
       	slq = path_L([p0, pi]) + ' ' + path_Q([pi, p1]);
        return slq;
     }
    } else {
    	return path_Q(d);
    }
  }

  // plot arcs
  var plot_arcs = function(arcs, path_func) {
          chart.selectAll('.arc_lines2')
					.data(arcs)
					.enter()
          .append('path')
					.attr('d', path_func)
					.attr('stroke', 'red')
					.attr('stroke-width', 2)
          .attr('fill', 'none');
          };

  plot_arcs(nodes_and_arcs.arcs, path_L);
  plot_nodes(nodes_and_arcs.nodes);
}

module.exports = {
    plot_git_log: plot_git_log
  };
