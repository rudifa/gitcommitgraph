module.exports = {
  get_commit_objects_from_lines: get_commit_objects_from_lines,
  get_commit_nodes_and_arcs: get_commit_nodes_and_arcs,
  internal: {
    // expose for unit tests
    _parse_refs: _parse_refs
  }
}

/**
 * get_commit_nodes_and_arcs - description
 *
 * @param  {array of objects} commit_objects
 * @param  {boolean} verbose
 * @return {object of arrays} -- nodes, arcs
 */

function get_commit_nodes_and_arcs(commit_objects, verbose) {
  const { nodes, node_dict, old_nodes } = get_commit_nodes(commit_objects, verbose)
  const { arcs, aux_nodes } = get_commit_arcs_and_aux_nodes(nodes, node_dict)
  return { nodes: nodes, arcs: arcs, aux_nodes: aux_nodes, old_nodes: old_nodes }
}

var console = { log: function() {} } // comment out to enable log

if (false) {
  console = window.console
} // if (true) would re-enable logging

const { Colowners } = require('../src/utils-set.js')

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

/**
 * _parse_refs - extract the git refs from the git log line
 *
 * @param  {string} line description
 * @return {object of arrays} description
 */

function _parse_refs(line) {
  // parse strings obtained with
  // git log --all --pretty=format:'¡¨¡%d¡¨¡' --decorate=full
  // (HEAD -> refs/heads/master, refs/remotes/origin/master, refs/remotes/origin/HEAD) // remote: ignore for now
  // (HEAD -> refs/heads/master, tag: refs/tags/test, refs/heads/dev, refs/heads/abc,def)
  let refsres = [] // will add ['branch', master], ...
  let arr
  let frags = line.split(', ')
  const re_refs = /(HEAD -> )?refs\/(heads|tags|remotes)\/([-,\/\w]+)/ // may need to add other characters
  for (let j = 0; j < frags.length; j++) {
    if ((arr = re_refs.exec(frags[j])) !== null) {
      // console.log('i,j=', i, j, 'arr=', arr)
      if (arr[1] == 'HEAD -> ' && arr[2] == 'heads') {
        refsres.push(['HEAD', arr[3]])
      } else if (arr[2] == 'heads') {
        refsres.push(['BRANCH', arr[3]])
      } else if (arr[2] == 'tags') {
        refsres.push(['TAG', arr[3]])
      } else if (arr[2] == 'remotes') {
        refsres.push(['REMOTE', arr[3]])
      }
    }
  }
  return refsres
}

/**
 * get_commit_objects_from_lines - description
 *
 * @param  {array of string} lines -- from git log
 * @return {array of objects} -- commit objects
 */

function get_commit_objects_from_lines(lines) {
  // lines: input array of text lines, e.g.
  // ¡¨¡bcc51ee¡¨¡ad82167¡¨¡ (tag: refs/tags/rudifa)¡¨¡Added the Prettyprint extension:¡¨¡2013-11-03¡¨¡Rudi Farkas¡¨¡
  // Split on separator string '¡¨¡' and return an object for each matching line

  const objects = []
  lines.forEach(function(line) {
    const cp = line.split('¡¨¡') // this separator is used in git log command, in view_gitgraph.js
    if (cp.length == 8) {
      const object = {
        sha: cp[1],
        parents: cp[2] ? cp[2].split(' ') : [],
        refs: _parse_refs(cp[3]),
        summary: cp[4],
        date: cp[5],
        author: cp[6]
      }
      objects.push(object)
    } else if (cp.length > 1) {
      let message = `Expected 8 substrings in git log, found ${cp.length} in line ${line}`
      window.console.log(message)
      alert(message)
    }
  })
  return objects
}

/**
 * get_commit_nodes - description
 *
 * @param  {array of objects} commit_objects description
 * @param  {boolean} verbose
 * @return {array of objects}  -- nodes
 */

function get_commit_nodes(commit_objects, verbose) {
  if (verbose) {
    // console = window.console // uncomment to enable logs
  }

  // 1. from array of commits, create array of nodes and the node_dict

  const nodes = []
  const node_dict = {}
  const old_nodes = []
  for (var i = 0; i < commit_objects.length; i++) {
    const commit = commit_objects[i]
    commit.children = []
    const node = {
      col: -1,
      row: i,
      commit: commit,
      col_old: -1
    }
    nodes.push(node)
    node_dict[node.commit.sha] = node
  }

  console.log('commit_objects.length=', commit_objects.length)
  console.log('nodes.length=', nodes.length)
  console.log('Object.keys(node_dict).length=', Object.keys(node_dict).length)

  // 2. add children sha array to each node

  // console.log('adding children, from i=0 down')
  for (let i = 0; i < nodes.length; i++) {
    // for (var i = nodes.length - 1; i >= 0; i--) {
    const node = nodes[i]
    const parents = node.commit.parents // array of shas
    for (let j = 0; j < parents.length; j++) {
      const parent = node_dict[parents[j]]
      parent.commit.children.push(node.commit.sha)
    }
  }

  // 3. update node.col, working from the start of node list

  // console.log('updating child cols, from i=0 down');
  const colowners = new Colowners()

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    console.log(`i= ${i}  nc:np ${node.commit.children.length}:${node.commit.parents.length}`)

    if (node.commit.children.length == 0) {
      colowners.set_node_col(node, colowners.first_free_col())
      console.log(`    ${node.commit.sha} childless, takes a free col ${node.col}`)
    }

    if (node.commit.children.length > 1) {
      // branch node
      sort_children_by_col(node, node_dict)
      let cnode = child(0, node, node_dict)

      const node_col_old = node.col

      if (colowners.owns_its_col(cnode)) {
        console.log(`    ${node.commit.sha} branch frees col ${node.col}`)
        colowners.free_col(node.col)
        colowners.set_node_col(node, cnode.col)
        console.log(`    ${node.commit.sha} branch takes col from child[${0}]`, cnode.col)
      }

      for (let j = 1; j < node.commit.children.length; j++) {
        let cnode = child(j, node, node_dict)

        if (node_col_old != cnode.col && node.row - cnode.row > 1) {
          node.col_old = node_col_old
        }

        if (colowners.owns_its_col(cnode)) {
          console.log(`    ${node.commit.sha} branch frees child ${cnode.commit.sha} col ${cnode.col}`)
          colowners.free_col(cnode.col)
        }
      }
    }

    // now this node is done, save its max_used_col before handling parent nodes
    node.max_used_col = colowners.max_used_col()

    if (node.commit.parents.length == 1) {
      const pnode_0 = parent(0, node, node_dict)
      if (pnode_0.col < 0) {
        colowners.set_node_col(pnode_0, node.col)
        console.log(`    ${node.commit.sha} pushing own col to parent_0 ${pnode_0.commit.sha}: (${pnode_0.col})`)
      } else {
        console.log(`--- ${node.commit.sha} parent_${0} ${pnode_0.commit.sha}: already has col (${pnode_0.col})`)
      }
    }

    if (node.commit.parents.length > 1) {
      // plain or merge node
      const pnode_0 = parent(0, node, node_dict)
      const pnode_1 = parent(1, node, node_dict)

      const patt_1a_applies = pnode_0.col < 0 && pnode_1.col >= 0 && pnode_1.row > node.row + 1
      if (patt_1a_applies) {
        colowners.set_node_col(pnode_0, colowners.first_free_col())
        console.log(
          `patt_1a ${node.commit.sha} merge pushing free col to parent_${0} ${pnode_0.commit.sha}: (${pnode_0.col},${
            pnode_0.row
          })`
        )
        continue
      }

      const patt_2a_applies = pnode_1.col < 0 && pnode_0.col >= 0 && pnode_0.row == node.row + 1 && 0
      if (patt_2a_applies) {
        colowners.set_node_col(pnode_1, node.col)
        console.log(
          `patt_2a ${node.commit.sha} pushing own col to parent_1 ${pnode_1.commit.sha}: (${pnode_1.col},${
            pnode_1.row
          })`
        )
        continue
      }

      if (pnode_0.col < 0 && pnode_1.col < 0) {
        console.log(`22  ${node.commit.sha} parent_0 and parent_1 uninitialized`)
      }

      if (pnode_0.col < 0) {
        colowners.set_node_col(pnode_0, node.col)
        console.log(
          `    ${node.commit.sha} pushing own col to parent_0 ${pnode_0.commit.sha}: (${pnode_0.col},${pnode_0.row})`
        )
      } else {
        console.log(`--- ${node.commit.sha} parent_${0} ${pnode_0.commit.sha}: already has col ${pnode_0.col}`)
      }
      for (let j = 1; j < node.commit.parents.length; j++) {
        // merge node
        const pnode_j = parent(j, node, node_dict)

        if (pnode_j.col < 0) {
          colowners.set_node_col(pnode_j, colowners.first_free_col())
          console.log(
            `    ${node.commit.sha} merge pushing free col to parent_${j} ${pnode_j.commit.sha}: (${pnode_j.col},${
              pnode_j.row
            })`
          )

          //old_nodes.push({ col: pnode_j.col, row: pnode_j.row }) // for info only


        } else {
          console.log(
            `--- ${node.commit.sha} merge: parent_${j} ${pnode_j.commit.sha}: already has col (${pnode_j.col},${
              pnode_j.row
            })`
          )
        }
      }
    }

    console.log('    ' + colowners.toString())

    if (node.col < 0) {
      console.log('***', 'node.col < 0')
    }
  } // end of i loop

  console.log('4. nodes done')

  for (let i = 0; i < nodes.length; i++) {
    check_parent_cols_are_different(i)
  }

  function check_parent_cols_are_different(i) {
    const node = nodes[i]
    for (let j = 0; j < node.commit.parents.length; ++j) {
      const parent_j = parent(j, node, node_dict)
      for (let k = j + 1; k < node.commit.parents.length; ++k) {
        const parent_k = parent(k, node, node_dict)
        if (parent_j.col == parent_k.col) {
          console.log(`*** i=${i} ${node.commit.sha} parent_j.col == parent_k.col (${parent_j.col})`)
          return false
        }
      }
    }
    return true
  }

  for (let i = 0; i < old_nodes.length; i++) {
    console.log(`old_node (${old_nodes[i].col},${old_nodes[i].row})`)
  }

  return {
    nodes: nodes,
    node_dict: node_dict,
    old_nodes: old_nodes
  }
}

/**
 * get_commit_arcs - description
 *
 * @param  {array of objects} nodes
 * @return {array of objects} -- arcs
 */
function get_commit_arcs_and_aux_nodes(nodes, node_dict) {
  console.log('get_commit_arcs_and_aux_nodes')
  const arcs = []
  const aux_nodes = []
  const halfColowners = new Colowners()
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    const use_aux_nodes = 4

    for (let j = 0; j < node.commit.parents.length; j++) {
      const pnode = parent(j, node, node_dict)

      if (use_aux_nodes == 0) {
        arcs.push([node, pnode])
        console.log(
          `i= ${i}  sha= ${node.commit.sha} node (${node.col},${node.row})  pnode (${pnode.col},${pnode.row})`
        )
      }
    }

    if (use_aux_nodes == 4) {
      for (let j = 0; j < node.commit.children.length; j++) {
        let cnode = child(j, node, node_dict)
        if (j > 0 && node.col_old - node.col > 1 && node.row - cnode.row > 2) {
          const aux_node = { col: node.col_old, row: node.row - 1 }
          aux_nodes.push(aux_node)
          arcs.push([aux_node, node])
          arcs.push([cnode, aux_node])
          console.log(`i= ${i} j= ${j}  sha= ${node.commit.sha} node (${node.col_old};${node.col},${node.row})  cnode (${cnode.col},${cnode.row})  aux_node (${aux_node.col},${aux_node.row})`)
        } else {
          arcs.push([cnode, node])
        }
      }
    }
  }

  return {
    arcs: arcs,
    aux_nodes: aux_nodes
  }
}

function sort_children_by_col(node, node_dict) {
  node.commit.children.sort((a, b) => node_dict[a].col - node_dict[b].col)
}

function sort_parents_by_row(node, node_dict) {
  node.commit.parents.sort((a, b) => node_dict[a].row - node_dict[b].row)
}

function child(i, node, node_dict) {
  return node_dict[node.commit.children[i]]
}

function parent(i, node, node_dict) {
  return node_dict[node.commit.parents[i]]
}
