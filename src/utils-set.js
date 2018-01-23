/*
Object created with new Colowners manages the ownership of 'col' (columns)
by 'node' objects.
node -- object having at least { sha: ..., col: ... } properties
col -- nonnegative integer
sha -- hex string, normally a short sha from a git commit
A 'col_x' is owned by a node_y if _colowners contains col_x: node_y.sha.
*/

const Colowners = function() {
  const _colowners = {}
  let _max_used_col = -1
  this.set_node_col = function(node, col) {
    node.col = col
    _colowners[col] = node.commit.sha
    if (_max_used_col < col) {
      _max_used_col = col
    }
  }
  this.mark_col = function(node, col) {
    _colowners[col] = node.commit.sha
    if (_max_used_col < col) {
      _max_used_col = col
    }
    return col
  }
  this.free_col = function(col) {
    delete _colowners[col]
    for (col = _max_used_col; col > -1; col--) {
      if (_colowners.hasOwnProperty(col)) {
        break
      }
    }
    _max_used_col = col
  }
  this.owns_its_col = function(node) {
    return _colowners[node.col] == node.commit.sha
  }
  this.first_free_col = function() {
    for (let col = 0; col < 1000; col++) {
      if (!_colowners.hasOwnProperty(col)) {
        return col
      }
    }
  }
  this.toString = function() {
    return JSON.stringify(_colowners)
  }
  this.max_used_col = function() {
    return _max_used_col
  }
}

module.exports = {
  Colowners: Colowners
}
