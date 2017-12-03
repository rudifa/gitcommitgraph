/*
Object created with new Colowners manages the ownership of 'col' (columns)
by 'node' objects.
node -- object having at least { sha: ..., col: ... } properties
col -- nonnegative integer
sha -- hex string, normally a short sha fronm a git commit
A 'col_x' is owned by a node_y if _colowners contains col_x: node_y.sha.
*/

const Colowners = function() {
  const _colowners = {};
  this.set_node_col = function(node, col) {
    node.col = col;
    _colowners[col] = node.sha;
  }
  this.free_col = function(col) {
    delete _colowners[col];
  }
  this.owns_its_col = function (node) {
    return _colowners[node.col] == node.sha;
  }
  this.first_free_col = function () {
    for (let c = 0; c < 1000; c++) {
      if (!_colowners.hasOwnProperty(c)) {
        return c;
      }
    }
  }
  this.toString = function() {
    return JSON.stringify(_colowners);
  }
}

module.exports = {
  Colowners: Colowners
};
