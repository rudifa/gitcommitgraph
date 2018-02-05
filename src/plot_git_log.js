module.exports = {
  plot_git_log: plot_git_log
}

const d3 = require('d3')
const colormap = require('colormap')
const { labelWithBg, rowOfLabelWithBg } = require('./labels.js')

const colors = colormap({
  colormap: 'rainbow',
  nshades: 11,
  format: 'hex',
  alpha: 1
})

function add_colors(arcs) {
  const clen = colors.length
  for (let i = 0; i < arcs.length; i++) {
    const arc = arcs[i]
    const [p0, p1] = arcs[i]
    const colcol = p1.col > p0.col ? p1.col : p0.col
    arcs[i]['color'] = colors[(2 * colcol) % clen]
    // arcs[i]['color'] = colors[i % clen] // NO GOOD
  }
}

function node_texts(node) {
  // preliminary text
  let texts = []
  let refs = node.commit.refs
  for (let i = 0; i < refs.length; i++) {
    texts.push(`[${refs[i][0]}: ${refs[i][1]}]`)
  }
  texts.push(node.commit.summary)
  texts.push(node.commit.author)
  texts.push(node.commit.date)
  return texts
}

function plot_node_texts(chart, nodes, xSc, ySc, rowWidth, rowHeight, colSpacing) {
  // console.log('chart', chart)
  // console.log('nodes', JSON.stringify(nodes))
  // console.log('xSc', xSc)
  // console.log('ySc', ySc)
  // console.log('rowWidth, rowHeight, colSpacing', rowWidth, rowHeight, colSpacing)

  const bar = chart
    .selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr('transform', function(d) {
      return `translate(0,${ySc(d.row - 0.5)})`
    })

  bar
    .append('rect')
    .attr('width', rowWidth)
    .attr('height', rowHeight)
    .style('fill', function(d, i) {
      return i % 2 ? '#ffffff' : '#f2f2f2'
    })

  bar
    .append('text')
    .attr('x', 0.5 * colSpacing)
    .attr('y', rowHeight * 0.75)
    .text(function(d) {
      return `${d.commit.sha}`
    })

  // bar
  //   .append('text')
  //   .attr('x', function(d) {
  //     return colSpacing * (5 + d.max_used_col)
  //   })
  //   .attr('y', rowHeight * 0.65)
  //   .text(function(d) {
  //     return node_texts(d).join(' ')
  //   })

  // alternate

  const labelWithBg1 = labelWithBg()
    .text(function(d) {
      return d[1]
    })
    .bgColor(labelBgColor)

  const rowOfLabelWithBg1 = rowOfLabelWithBg()
    .labelWithBg(labelWithBg1)
    .xRow(function(d) {
      return xSc(1 + d.max_used_col)
    })
    .yRow(function(d) {
      return rowHeight * 0.1
    })
    .textsRow(function(d) {
      const textsRow = d.commit.refs
      textsRow.push(['SUMMARY', d.commit.summary])
      return textsRow
    })

  bar.call(rowOfLabelWithBg1)

  function labelBgColor(d) {
    switch (d[0]) {
      case 'HEAD':
        return '#f4b76f'
      case 'BRANCH':
        return '#b5e19d'
      case 'TAG':
        return '#faec90'
      case 'REMOTE':
        return '#b8d7ef'
      default:
        return 'transparent'
    }
  }
}

function plot_git_log(dir, nodes_and_arcs, arc_style) {
  // console.log('plot_git_log:', 'dir=', dir, 'arc_style=', arc_style)
  const { nodes, arcs, aux_nodes, old_nodes } = nodes_and_arcs

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
  const rowHeight = 18
  const colSpacing = 18

  d3.select('h4').text(dir)

  // define scaling functions for col, row
  const xSc = d3
    .scaleLinear()
    .domain([0, 1])
    .range([4 * colSpacing, 5 * colSpacing])

  const ySc = d3
    .scaleLinear()
    .domain([0, 1])
    .range([0.5 * rowHeight, 1.5 * rowHeight])

  const chart = d3
    .select('.chart')
    .attr('width', rowWidth)
    .attr('height', rowHeight * nodes.length)

  chart.selectAll('*').remove()

  plot_node_texts(chart, nodes, xSc, ySc, rowWidth, rowHeight, colSpacing)

  plot_arcs(arcs, arc_path(arc_style))

  plot_nodes(nodes)

  plot_aux_nodes(aux_nodes) // development only

  plot_old_nodes(old_nodes) // development only

  function plot_nodes(nodes) {
    chart
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', function(d) {
        return xSc(d.col)
      })
      .attr('cy', function(d) {
        return ySc(d.row)
      })
      .attr('stroke', 'black')
      .attr('fill', 'white')
  }

  function plot_aux_nodes(anodes) {
    chart
      .selectAll('.anode')
      .data(anodes)
      .enter()
      .append('circle')
      .attr('r', 2)
      .attr('cx', function(d) {
        return xSc(d.col)
      })
      .attr('cy', function(d) {
        return ySc(d.row)
      })
      .attr('stroke', 'black')
      .attr('fill', 'red')
  }

  function plot_old_nodes(onodes) {
    chart
      .selectAll('.onode')
      .data(onodes)
      .enter()
      .append('circle')
      .attr('r', 6)
      .attr('cx', function(d) {
        return xSc(d.col)
      })
      .attr('cy', function(d) {
        return ySc(d.row)
      })
      .attr('stroke', 'red')
      .attr('fill', 'transparent')
  }

  // return svg command sequence for straight line from p0 to p1
  function path_L(d) {
    const [p0, p1] = d
    return `M ${xSc(p0.col)} ${ySc(p0.row)} L ${xSc(p1.col)} ${ySc(p1.row)}`
  }

  // return svg command sequence for quadratic bezier line from p0 to p1
  // with control point at the same row as one of endpoints
  function path_Q(d) {
    const [p0, p1] = d
    const pc = p1.col >= p0.col ? { col: p1.col, row: p0.row } : { col: p0.col, row: p1.row }
    return `M ${xSc(p0.col)} ${ySc(p0.row)}` + `Q ${xSc(pc.col)} ${ySc(pc.row)} ${xSc(p1.col)} ${ySc(p1.row)}`
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
      `M ${xSc(p0.col)} ${ySc(p0.row)}` +
      `C ${xSc(c0.col)} ${ySc(c0.row)} ${xSc(c1.col)} ${ySc(c1.row)} ${xSc(p1.col)} ${ySc(p1.row)}`
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
