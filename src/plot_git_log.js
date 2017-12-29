const d3 = require('d3')
const colormap = require('colormap')

const colors = colormap({
  colormap: 'bluered',
  nshades: 7,
  format: 'hex',
  alpha: 1
})

function add_colors(arcs) {
  const clen = colors.length
  for (let i = 0; i < arcs.length; i++) {
    const arc = arcs[i]
    const [p0, p1] = arcs[i]
    const colcol = p1.col > p0.col ? p1.col : p0.col
    arcs[i]['color'] = colors[colcol % clen]
  }
}

function node_texts(node) {
  // preliminary text
  let texts = []
  let refs = node.commit.refs
  if (refs.current.length) {
    texts.push(`[C: ${refs.current[0]}]`)
  }
  for (let i = 0; i < refs.branches.length; i++) {
    texts.push(`[B: ${refs.branches[i]}]`)
  }
  for (let i = 0; i < refs.tags.length; i++) {
    texts.push(`[T: ${refs.tags[i]}]`)
  }
  texts.push(node.commit.summary)
  texts.push(node.commit.author)
  texts.push(node.commit.date)
  return texts
}

function plot_node_texts(chart, nodes, sx, sy, rowWidth, rowHeight, colSpacing) {
  // console.log('chart', chart)
  // console.log('nodes', JSON.stringify(nodes))
  // console.log('sx', sx)
  // console.log('sy', sy)
  // console.log('rowWidth, rowHeight, colSpacing', rowWidth, rowHeight, colSpacing)

  const bar = chart
    .selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return `translate(0,${sy(d.row - 0.5)})`
    })

  bar
    .append('rect')
    .attr('width', rowWidth)
    .attr('height', rowHeight - 1)

  bar
    .append('text')
    .attr('x', 0.5 * colSpacing)
    .attr('y', rowHeight * 0.65)
    .text(function(d) {
      return `${d.commit.sha}`
    })

  bar
    .append('text')
    .attr('x', function(d) {
      return colSpacing * (5 + d.max_used_col)
    })
    .attr('y', rowHeight * 0.65)
    .text(function(d) {
      return node_texts(d).join(' ')
    })
}

function plot_git_log(dir, nodes_and_arcs, arc_style) {
  // console.log('plot_git_log:', 'dir=', dir, 'arc_style=', arc_style)

  function arc_path(arc_style) {
    const paths = {
      linear: path_L,
      'cubic-bézier': path_C,
      'quadratic-bézier': path_Q,
      'cubic-bézier-vertical': path_CL,
      'quadratic-bézier-vertical': path_QL
    }
    const path = paths[arc_style]
    return path ? path : path_L
  }

  const rowWidth = 900
  const rowHeight = 25
  const colSpacing = 20

  d3.select('h4').text(dir)

  // define scaling functions for col, row
  const sx = d3
    .scaleLinear()
    .domain([0, 1]) // row
    .range([4 * colSpacing, 5 * colSpacing]) // col

  const sy = d3
    .scaleLinear()
    .domain([0, 1]) // col
    .range([0.5 * rowHeight, 1.5 * rowHeight]) // row

  const chart = d3
    .select('.chart')
    .attr('width', rowWidth)
    .attr('height', rowHeight * nodes_and_arcs.nodes.length)

  chart.selectAll('*').remove()

  plot_node_texts(chart, nodes_and_arcs.nodes, sx, sy, rowWidth, rowHeight, colSpacing)
  plot_arcs(nodes_and_arcs.arcs, arc_path(arc_style))
  plot_nodes(nodes_and_arcs.nodes)

  function plot_nodes(nodes) {
    chart
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', function(d) {
        return sx(d.col)
      })
      .attr('cy', function(d) {
        return sy(d.row)
      })
      .attr('stroke', 'black')
      .attr('fill', 'white')
  }

  // return svg command sequence for straight line from p0 to p1
  function path_L(d) {
    const [p0, p1] = d
    return `M ${sx(p0.col)} ${sy(p0.row)} L ${sx(p1.col)} ${sy(p1.row)}`
  }

  // return svg command sequence for quadratic bezier line from p0 to p1
  // with control point at the same row as one of endpoints
  function path_Q(d) {
    const [p0, p1] = d
    const pc = p1.col >= p0.col ? { col: p1.col, row: p0.row } : { col: p0.col, row: p1.row }
    return (
      `M ${sx(p0.col)} ${sy(p0.row)}` + `Q ${sx(pc.col)} ${sy(pc.row)} ${sx(p1.col)} ${sy(p1.row)}`
    )
  }

  // return svg command sequence for a combined curve (optional linear + quadratic Bezier)
  // from p0 to p1, where these points define a diagonal of a rectangle;
  // limit the vertical extent of Bezier to 1 internode distance
  function path_QL(d) {
    const [p0, p1] = d
    if (p1.row - p0.row > 1 && p1.col != p0.col) {
      // vertical path > 1:
      // create an intermediate point pi and split arc in L and Q parts
      if (p1.col > p0.col) {
        const pi = { col: p1.col, row: p0.row + 1 }
        return `${path_Q([p0, pi])}  ${path_L([pi, p1])}`
      } else {
        const pi = { col: p0.col, row: p1.row - 1 }
        return `${path_L([p0, pi])}  ${path_Q([pi, p1])}`
      }
    } else {
      return path_Q(d)
    }
  }

  // cubic bezier
  function path_C(d) {
    const [p0, p1] = d
    // const c0 = { col: p0.col, row: (p1.row + p0.row) / 2 };
    // const c1 = { col: p1.col, row: (p1.row + p0.row) / 2 };
    const c0 = { col: p0.col, row: (2 * p1.row + p0.row) / 3 }
    const c1 = { col: p1.col, row: (p1.row + 2 * p0.row) / 3 }
    // const c0 = { col: p0.col, row: p1.row };
    // const c1 = { col: p1.col, row: p0.row };
    return (
      `M ${sx(p0.col)} ${sy(p0.row)}` +
      `C ${sx(c0.col)} ${sy(c0.row)} ${sx(c1.col)} ${sy(c1.row)} ${sx(p1.col)} ${sy(p1.row)}`
    )
  }

  // return svg command sequence for a combined curve (optional linear + cubic Bezier)
  // from p0 to p1, where these points define a diagonal of a rectangle;
  // limit the vertical extent of Bezier to 1 internode distance
  function path_CL(d) {
    const [p0, p1] = d
    if (p1.row - p0.row > 1 && p1.col != p0.col) {
      // vertical path > 1:
      // create an intermediate point pi and split arc in L and Q parts
      if (p1.col > p0.col) {
        const pi = { col: p1.col, row: p0.row + 1 }
        return `${path_C([p0, pi])}  ${path_L([pi, p1])}`
      } else {
        const pi = { col: p0.col, row: p1.row - 1 }
        return `${path_L([p0, pi])}  ${path_C([pi, p1])}`
      }
    } else {
      return path_C(d)
    }
  }

  // plot arcs
  function plot_arcs(arcs, path_func) {
    add_colors(arcs)

    chart
      .selectAll('.arc_lines2')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', path_func)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .attr('fill', 'none')
  }
}

module.exports = {
  plot_git_log: plot_git_log
}
