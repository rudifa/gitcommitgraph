


var console = { log: function(){} }; // comment out to enable log

if (false) { console = window.console; } // if (true) would re-enable logging


const { Colowners } = require('../src/utils-set.js');

/*
  Purpose: parse git history from
  git log --graph --pretty=format:'¡¨¡%h¡¨¡%p¡¨¡%d¡¨¡%s¡¨¡%cd¡¨¡%an¡¨¡' --abbrev-commit --date=short --decorate=full > git_log_out.txt
  similar to:

  * ¡¨¡611748a¡¨¡07a1266¡¨¡ (HEAD -> refs/heads/master, refs/remotes/origin/master, refs/remotes/origin/HEAD)¡¨¡Allow a JSONValue to be created from an int¡¨¡2016-07-06¡¨¡Mike Anchor¡¨¡
  *   ¡¨¡07a1266¡¨¡d5584f0 5f6f8f3¡¨¡¡¨¡Merge pull request #32 from EvilPudding/master¡¨¡2016-02-06¡¨¡Mike Anchor¡¨¡
  |\
  | * ¡¨¡5f6f8f3¡¨¡7ce5b58¡¨¡¡¨¡Optimization.¡¨¡2015-12-11¡¨¡EvilPudding¡¨¡
  * |   ¡¨¡d5584f0¡¨¡7ce5b58 40b75f2¡¨¡¡¨¡Merge pull request #30 from fokede/master¡¨¡2016-02-06¡¨¡Mike Anchor¡¨¡
  |\ \
  | |/
  |/|
  | * ¡¨¡40b75f2¡¨¡7ce5b58¡¨¡¡¨¡MinGW compatibility fix¡¨¡2015-10-25¡¨¡fokede¡¨¡
  |/
  *   ¡¨¡7ce5b58¡¨¡7682af4 36e066d¡¨¡¡¨¡Merge pull request #27 from Robien/master¡¨¡2015-08-22¡¨¡Mike Anchor¡¨¡
  ...
  in view of drawing a git history graph.

*/

function get_commit_objects_from_lines(lines) {
  // lines: input array of text lines, e.g.
  // | * ¡¨¡bcc51ee¡¨¡ad82167¡¨¡ (tag: refs/tags/rudifa)¡¨¡Added the Prettyprint extension:¡¨¡2013-11-03¡¨¡Rudi Farkas¡¨¡
  // Split on separator string '¡¨¡' and return an object for each matching line

  const objects = [];
  lines.forEach(function(line) {
    const cp = line.split('¡¨¡'); // this separator is used in git log command, in view_gitgraph.js
    if (cp.length == 8) {
      const object = {
        graph: cp[0],
        sha: cp[1],
        parents: cp[2] ? cp[2].split(' ') : [],
        refs: cp[3],
        summary: cp[4],
        date: cp[5],
        author: cp[6]
        // empty cp[7]
      };
      objects.push(object);
    } else if (cp.length > 1) {
      let message = `Expected 8 substrings in git log, found ${cp.length} in line ${line}`;
      window.console.log(message);
      alert(message);
    }
  });
  return objects;
}

function get_commit_nodes_and_arcs(commit_objects, verbose) {
  const nodes = get_commit_nodes(commit_objects, verbose);
  const arcs = get_commit_arcs(nodes);
  return { nodes: nodes, arcs: arcs };
}

function get_commit_nodes(commit_objects, verbose) {

  if (verbose) { console = window.console; }

  // 1. from array of commits, create array of nodes and the node_dict

  const nodes = [];
  const node_dict = {};
  for (var i = 0; i < commit_objects.length; i++) {
    const commit = commit_objects[i];
    const column = -1;
    const node = {
      col: column,
      row: i,
      sha: commit.sha,
      parents: commit.parents,
      children: [],
      commit: commit
    };
    nodes.push(node);
    node_dict[node.sha] = nodes[i];
  }

  // 2. add children sha array to each node

  console.log('adding children, from i=0 down');
  for (let i = 0; i < nodes.length; i++) {
    // for (var i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i];
    const parents = node.parents; // array of shas
    for (let j = 0; j < parents.length; j++) {
      const parent = node_dict[parents[j]];
      parent.children.push(node.sha);
    }
  }

  function sort_children_by_col(node) {
    node.children.sort((a, b) => node_dict[a].col - node_dict[b].col);
  }

  function child(i, node) {
    return node_dict[node.children[i]];
  }

  function parent(i, node) {
    return node_dict[node.parents[i]];
  }

  // 3. update node.col, working from the start of node list

  // console.log('updating child cols, from i=0 down');
  const colowners = new Colowners();

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.children.length == 0) { // childless node
      colowners.set_node_col(node, colowners.first_free_col());
      // console.log('    uninitialized, taking a free col', node.col);
    }

    if (node.children.length > 1) { // branch node
      sort_children_by_col(node);
      let cnode = child(0, node);
      if (colowners.owns_its_col(cnode)) {
        colowners.free_col(node.col);
        colowners.set_node_col(node, cnode.col)
        // console.log(`    bn takes col from child[${0}]`, cnode.col);
      }

      for (let j = 1; j < node.children.length; j++) {
        let cnode = child(j, node);
        if (colowners.owns_its_col(cnode)) {
          colowners.free_col(cnode.col);
          // console.log(`    bn free col of child[${j}]`, cnode.col);
        }
      }
    }

    if (node.parents.length > 0) { // plain or merge node
      const pnode_0 = parent(0, node);
      // console.log(pnode_0.col)
      if (pnode_0.col < 0) {
        colowners.set_node_col(pnode_0, node.col);
        // console.log(`    mn pushing own col to parent_0 ${pnode_0.sha}:`, pnode_0.col);
      } else {
        // console.log(`*** mn would push own col to parent_0 ${pnode_0.sha}:`, 'already has a value', pnode_0.col);
      }
      for (let j = 1; j < node.parents.length; j++) { // merge node
        const pnode_j = parent(j, node);
        if (pnode_j.col < 0) {
          colowners.set_node_col(pnode_j, colowners.first_free_col());
          // console.log(`    mn pushing free col to parent_${j} ${pnode_j.sha}:`, pnode_j.col);
        } else {
          // console.log(`*** mn would push free col to parent_${j} ${pnode_j.sha}:`, 'already has a value', pnode_j.col);
        }
      }
    }

    if (node.col < 0) { console.log('***','node.col < 0') }
  } // end of i loop
  console.log('nodes done');

  return nodes;
}

function get_commit_arcs(nodes) {
  const arcs = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.commit.parents.forEach(function(parentSha) {
      const indexOfParent = nodes.findIndex(function(node) {
        return parentSha == node.commit.sha;
      });
      if (indexOfParent >= 0) {
        const pnode = nodes[indexOfParent];
        arcs.push([node, pnode]);
      }
    });
  }
  return arcs;
}

module.exports = {
  get_commit_objects_from_lines: get_commit_objects_from_lines,
  get_commit_nodes_and_arcs: get_commit_nodes_and_arcs
};
