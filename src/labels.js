
const d3 = require('d3')

///////////////////////////////////////////////////////////////////////
module.exports = {
  labelWithBg: labelWithBg,
  rowOfLabelWithBg: rowOfLabelWithBg
}

d3.labels = module.exports


/**
 * rowOfLabelWithBg - returns a configurable function that ...
 *
 * @return {function} - appends a row of labels with background to a d3 selection
 *
 * @prop {function} labelWithBg - function that appends a label to a d3 selection
 * @prop {function or number} xRow - start x for the row of labels
 * @prop {function or number} yRow - y for the row of labels
 * @prop {array} textsRow - array of texts, one for each label in the row
 *
 */
function rowOfLabelWithBg() {
  // console.log('rowOfLabelWithBg_0')
  let _labelWithBg = function(d) {}
  let _x = 0
  let _y = 0
  let _texts = []

  function _translateXY(d) {
    let x = typeof _x === 'function' ? _x(d) : _x
    let y = typeof _y === 'function' ? _y(d) : _y
    return `translate(${x},${y})`
  }

  function inner(selection) {
    selection.each(function(data_row, i_row) {
      d3
        .select(this)
        .append('g')
        .attr('class', 'g_row')
        .attr('transform', _translateXY)
        .selectAll('.col')
        .data(_texts)
        .enter()
        .call(_labelWithBg.xNext(0)) // must reset xNext here!
    })
  }

  inner.labelWithBg = function(_) {
    return arguments.length ? ((_labelWithBg = _), this) : _labelWithBg
  }
  inner.xRow = function(_) {
    return arguments.length ? ((_x = _), this) : _x
  }
  inner.yRow = function(_) {
    return arguments.length ? ((_y = _), this) : _y
  }
  inner.textsRow = function(_) {
    return arguments.length ? ((_texts = _), this) : _texts
  }

  return inner
}

/**
 * labelWithBg - returns a configurable function
 *
 * @return {function} - appends a label with background to a d3 selection
 * @prop {func_or_string} text - label text
 * @prop {func_or_string} bgColor - label background color
 * @prop {number} xNext - next label position relative to the row start x
 */
function labelWithBg() {
  // console.log('labelWithBg')
  let _fillColor = 'orange'
  let _text = function(d) {
    // default for demos
    return d
  }
  let _xNext = 0
  const x_pad = 5
  function inner(selection) {
    selection.each(function(d, i) {
      var bbox
      const g_label = d3
        .select(this)
        .append('g')
        .attr('class', 'g_label')
      g_label
        .append('text')
        .attr('dy', '1em')
        .text(_text)
        .attr('x', _xNext)
        .attr('y', 0)
        .each(function() {
          bbox = this.getBBox()
          _xNext += 3 * x_pad + bbox.width
        })
      g_label
        .insert('rect', 'text')
        .attr('x', bbox.x - x_pad)
        .attr('y', bbox.y)
        .attr('rx', bbox.height * 0.2)
        .attr('ry', bbox.height * 0.2)
        .attr('width', bbox.width + 2 * x_pad)
        .attr('height', bbox.height)
        // .style('stroke', 'black')
        .style('fill', _fillColor)
    })
  }

  inner.text = function(_) {
    return arguments.length ? ((_text = _), this) : _text
  }
  inner.bgColor = function(_) {
    return arguments.length ? ((_fillColor = _), this) : _fillColor
  }
  inner.xNext = function(_) {
    return arguments.length ? ((_xNext = _), this) : _xNext
  }

  return inner
}
