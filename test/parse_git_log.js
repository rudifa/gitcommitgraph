const expect = require('chai').expect
const parse_git_log = require('../src/parse_git_log')
const sample_git_log = require('./sample_git_log')

// console.log('sample_git_log', sample_git_log)

/**
 * const jtw_object - json_test_view_object
 *
 * @param  {object} obj  object to stringify, selectively
 * @param  {string} keys keys of interest
 * @return {string}      stringified view of obj, limited to keys
 */
const jtw_object = function(obj, keys) {
  // json_test_view_object
  const test_view = {}
  for (let key in obj) {
    if (keys.includes(key)) {
      test_view[key] = obj[key]
    }
  }
  return JSON.stringify(test_view)
}

/**
 * const jtw_node - json_test_view_node
 *
 * @param  {object} commit
 * @return {string}      stringified view of commit, limited to keys of interest
 */
const jtw_commit = function(commit) {
  return jtw_object(commit, ['sha', 'parents', 'children'])
}

/**
 * const jtw_node - json_test_view_node
 *
 * @param  {object} node
 * @return {string}      stringified view of node, limited to keys of interest
 */
const jtw_node = function(node) {
  return jtw_object(node, ['col', 'row'])
}

/**
 * const jtw_arc - description
 *
 * @param  {object} arc description
 * @return {string}     stringified view of arc, limited to keys of interest
 */
const jtw_arc = function(arc) {
  return jtw_object(arc[0], ['col', 'row']) + '-' + jtw_object(arc[1], ['col', 'row'])
}

describe('parse_refs', function() {
  const parse_refs = parse_git_log.internal._parse_refs

  it('parse_refs should return array of 2-element arrays', function() {
    expect('[]').to.equal(JSON.stringify(parse_refs('')))
    expect('[["HEAD","master"]]').to.equal(JSON.stringify(parse_refs(' (HEAD -> refs/heads/master)')))
    expect('[["BRANCH","dev1"],["BRANCH","dev2"]]').to.equal(
      JSON.stringify(parse_refs(' (refs/heads/dev1, refs/heads/dev2)'))
    )
    expect('[["TAG","tag-start"],["TAG","tag-end"]]').to.equal(
      JSON.stringify(parse_refs(' (tag: refs/tags/tag-start, tag: refs/tags/tag-end)'))
    )
    expect('[["HEAD","master"],["BRANCH","dev1"],["TAG","test1"],["BRANCH","dev2"],["TAG","test2"]]').to.equal(
      JSON.stringify(
        parse_refs(
          ' (HEAD -> refs/heads/master, refs/heads/dev1, tag: refs/tags/test1, refs/heads/dev2, tag: refs/tags/test2)'
        )
      )
    )
    expect('[["HEAD","master"],["REMOTE","origin/master"],["REMOTE","origin/HEAD"]]').to.equal(
      JSON.stringify(parse_refs(' (HEAD -> refs/heads/master, refs/remotes/origin/master, refs/remotes/origin/HEAD)'))
    )
  })
})

describe('sample_git_log.A_single_merge', function() {
  const log_lines = sample_git_log.A_single_merge()
  // console.log('log_lines', log_lines)

  const commits = parse_git_log.get_commit_objects_from_lines(log_lines)
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits)
  const { nodes, arcs } = parse_git_log.get_commit_nodes_and_arcs(commits)

  // log_lines
  it('expect log_lines[0]:', function() {
    expect(7).to.equal(log_lines.length)
    expect(log_lines[0]).to.equal(
      '*   ¡¨¡bca8687¡¨¡a34017e d01380d¡¨¡Merge branch refs/heads/b1¡¨¡Fri Nov 24 19:53:00 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡'
    )
  })

  // commits
  // console.log('commits', commits)
  it('expect commits:', function() {
    expect(5).to.equal(commits.length)
    expect(jtw_commit(commits[0])).to.equal('{"sha":"bca8687","parents":["d01380d","a34017e"],"children":[]}')
    expect(jtw_commit(commits[1])).to.equal('{"sha":"d01380d","parents":["66f3a45"],"children":["bca8687"]}')
    expect(jtw_commit(commits[2])).to.equal('{"sha":"a34017e","parents":["66f3a45"],"children":["bca8687"]}')
    expect(jtw_commit(commits[3])).to.equal('{"sha":"66f3a45","parents":["d14aa55"],"children":["d01380d","a34017e"]}')
    expect(jtw_commit(commits[4])).to.equal('{"sha":"d14aa55","parents":[],"children":["66f3a45"]}')
  })

  // nodes
  // console.log(jtw_node(nodes[0]))
  it('expect nodes:', function() {
    expect(5).to.equal(nodes.length)
    expect(jtw_node(nodes[0])).to.equal('{"col":0,"row":0}')
    expect(jtw_node(nodes[1])).to.equal('{"col":0,"row":1}')
    expect(jtw_node(nodes[2])).to.equal('{"col":1,"row":2}')
    expect(jtw_node(nodes[3])).to.equal('{"col":0,"row":3}')
    expect(jtw_node(nodes[4])).to.equal('{"col":0,"row":4}')
  })

  // arcs TODO
})

describe('sample_git_log.B_branches_only', function() {
  const log_lines = sample_git_log.B_branches_only() // from --order-topo
  // console.log('log_lines', log_lines)

  const commits = parse_git_log.get_commit_objects_from_lines(log_lines)
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits)
  const { nodes, arcs } = parse_git_log.get_commit_nodes_and_arcs(commits)

  // log_lines
  it('expect log_lines:', function() {
    expect(10).to.equal(log_lines.length)
    expect(log_lines[0]).to.equal(
      '* ¡¨¡7165a30¡¨¡1f7f761¡¨¡6 on master¡¨¡Wed Nov 29 09:53:59 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡'
    )
    expect(log_lines[4]).to.equal(
      '| * ¡¨¡331947e¡¨¡419429a¡¨¡4 on branch_b¡¨¡Sun Nov 26 11:44:06 2017 +0100¡¨¡rudifa¡¨¡ (branch_b)¡¨¡'
    )
  })

  // commits
  // console.log('commits', commits)
  it('expect commits:', function() {
    expect(7).to.equal(commits.length)
    expect(jtw_commit(commits[0])).to.equal('{"sha":"7165a30","parents":["1f7f761"],"children":[]}')
    expect(jtw_commit(commits[1])).to.equal('{"sha":"4b8a42d","parents":["1f7f761"],"children":[]}')
    expect(jtw_commit(commits[2])).to.equal('{"sha":"1f7f761","parents":["419429a"],"children":["7165a30","4b8a42d"]}')
    expect(jtw_commit(commits[3])).to.equal('{"sha":"331947e","parents":["419429a"],"children":[]}')
    expect(jtw_commit(commits[4])).to.equal('{"sha":"7ba98b0","parents":["419429a"],"children":[]}')
    expect(jtw_commit(commits[5])).to.equal(
      '{"sha":"419429a","parents":["2882080"],"children":["1f7f761","331947e","7ba98b0"]}'
    )
    expect(jtw_commit(commits[6])).to.equal('{"sha":"2882080","parents":[],"children":["419429a"]}')
  })

  // nodes
  // console.log(jtw_node(nodes[0]))
  it('expect nodes:', function() {
    expect(7).to.equal(nodes.length)
    expect(jtw_node(nodes[0])).to.equal('{"col":0,"row":0}')
    expect(jtw_node(nodes[1])).to.equal('{"col":1,"row":1}')
    expect(jtw_node(nodes[2])).to.equal('{"col":0,"row":2}')
    expect(jtw_node(nodes[3])).to.equal('{"col":1,"row":3}')
    expect(jtw_node(nodes[4])).to.equal('{"col":2,"row":4}')
    expect(jtw_node(nodes[5])).to.equal('{"col":0,"row":5}')
    expect(jtw_node(nodes[6])).to.equal('{"col":0,"row":6}')
  })

  // arcs
  // console.log(arcs[0])
  // console.log(jtw_arc(arcs[0]))
  it('expect arcs:', function() {
    expect(6).to.equal(arcs.length)
    expect(jtw_arc(arcs[0])).to.equal('{"col":0,"row":0}-{"col":0,"row":2}')
    expect(jtw_arc(arcs[1])).to.equal('{"col":1,"row":1}-{"col":0,"row":2}')
    expect(jtw_arc(arcs[2])).to.equal('{"col":0,"row":2}-{"col":0,"row":5}')
    expect(jtw_arc(arcs[3])).to.equal('{"col":1,"row":3}-{"col":0,"row":5}')
    expect(jtw_arc(arcs[4])).to.equal('{"col":2,"row":4}-{"col":0,"row":5}')
    expect(jtw_arc(arcs[5])).to.equal('{"col":0,"row":5}-{"col":0,"row":6}')
  })
})

describe('sample_git_log.C_merge_3_into_master', function() {
  const log_lines = sample_git_log.C_merge_3_into_master() // from --order-topo
  // console.log('log_lines', log_lines)

  const commits = parse_git_log.get_commit_objects_from_lines(log_lines)
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits)
  const { nodes, arcs } = parse_git_log.get_commit_nodes_and_arcs(commits)

  // log_lines
  it('expect log_lines:', function() {
    expect(14).to.equal(log_lines.length)
    expect(log_lines[0]).to.equal(
      '*   ¡¨¡59fe04b¡¨¡6e3cc48 694959a¡¨¡Merge branch branch3¡¨¡Fri Dec 1 17:48:57 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡'
    )
    expect(log_lines[13]).to.equal('* ¡¨¡8857cdb¡¨¡¡¨¡initial¡¨¡Fri Dec 1 17:48:50 2017 +0100¡¨¡rudifa¡¨¡¡¨¡')
  })

  // commits
  // console.log('commits', commits)
  it('expect commits:', function() {
    expect(8).to.equal(commits.length)
    expect(jtw_commit(commits[0])).to.equal('{"sha":"59fe04b","parents":["694959a","6e3cc48"],"children":[]}')
    expect(jtw_commit(commits[1])).to.equal('{"sha":"694959a","parents":["8857cdb"],"children":["59fe04b"]}')
    expect(jtw_commit(commits[2])).to.equal('{"sha":"6e3cc48","parents":["1b8f801","69cccee"],"children":["59fe04b"]}')
    expect(jtw_commit(commits[3])).to.equal('{"sha":"1b8f801","parents":["8857cdb"],"children":["6e3cc48"]}')
    expect(jtw_commit(commits[4])).to.equal('{"sha":"69cccee","parents":["6b2cb75","5168e7a"],"children":["6e3cc48"]}')
    expect(jtw_commit(commits[5])).to.equal('{"sha":"6b2cb75","parents":["8857cdb"],"children":["69cccee"]}')
    expect(jtw_commit(commits[6])).to.equal('{"sha":"5168e7a","parents":["8857cdb"],"children":["69cccee"]}')
    expect(jtw_commit(commits[7])).to.equal(
      '{"sha":"8857cdb","parents":[],"children":["694959a","1b8f801","6b2cb75","5168e7a"]}'
    )
  })

  // nodes
  // console.log(jtw_node(nodes[0]))
  it('expect nodes:', function() {
    expect(8).to.equal(nodes.length)
    expect(jtw_node(nodes[0])).to.equal('{"col":0,"row":0}')
    expect(jtw_node(nodes[1])).to.equal('{"col":0,"row":1}')
    expect(jtw_node(nodes[2])).to.equal('{"col":1,"row":2}')
    expect(jtw_node(nodes[3])).to.equal('{"col":1,"row":3}')
    expect(jtw_node(nodes[4])).to.equal('{"col":2,"row":4}')
    expect(jtw_node(nodes[5])).to.equal('{"col":2,"row":5}')
    expect(jtw_node(nodes[6])).to.equal('{"col":3,"row":6}')
    expect(jtw_node(nodes[7])).to.equal('{"col":0,"row":7}')
  })

  // arcs
  // console.log(arcs[0])
  // console.log(jtw_arc(arcs[0]))
  it('expect arcs:', function() {
    expect(10).to.equal(arcs.length)
  })
})

describe('sample_git_log.F_octo_merge_3_into_master', function() {
  const log_lines = sample_git_log.D_octo_merge_3_into_master() // from --order-topo
  // console.log('log_lines', log_lines)

  const commits = parse_git_log.get_commit_objects_from_lines(log_lines)
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits)
  const { nodes, arcs } = parse_git_log.get_commit_nodes_and_arcs(commits)

  // log_lines
  it('expect log_lines:', function() {
    expect(12).to.equal(log_lines.length)
    expect(log_lines[0]).to.equal(
      '* ¡¨¡6b49d9e¡¨¡3c36210¡¨¡master¡¨¡Fri Dec 1 19:26:41 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡'
    )
    expect(log_lines[11]).to.equal('* ¡¨¡3cfe6bd¡¨¡¡¨¡initial¡¨¡Fri Dec 1 19:26:35 2017 +0100¡¨¡rudifa¡¨¡¡¨¡')
  })

  // commits
  // console.log('commits', commits)
  it('expect commits:', function() {
    expect(8).to.equal(commits.length)
    expect(jtw_commit(commits[0])).to.equal('{"sha":"6b49d9e","parents":["3c36210"],"children":[]}')
    expect(jtw_commit(commits[1])).to.equal(
      '{"sha":"3c36210","parents":["d8c031b","d7a9ecb","a759c98","d72c16c"],"children":["6b49d9e"]}'
    )
    expect(jtw_commit(commits[2])).to.equal('{"sha":"d8c031b","parents":["d275fba"],"children":["3c36210"]}')
    expect(jtw_commit(commits[3])).to.equal('{"sha":"d7a9ecb","parents":["d275fba"],"children":["3c36210"]}')
    expect(jtw_commit(commits[4])).to.equal('{"sha":"a759c98","parents":["d275fba"],"children":["3c36210"]}')
    expect(jtw_commit(commits[5])).to.equal('{"sha":"d72c16c","parents":["d275fba"],"children":["3c36210"]}')
    expect(jtw_commit(commits[6])).to.equal(
      '{"sha":"d275fba","parents":["3cfe6bd"],"children":["d8c031b","d7a9ecb","a759c98","d72c16c"]}'
    )
    expect(jtw_commit(commits[7])).to.equal('{"sha":"3cfe6bd","parents":[],"children":["d275fba"]}')
  })

  // nodes
  // console.log(jtw_node(nodes[0]))
  it('expect nodes:', function() {
    expect(8).to.equal(nodes.length)
    expect(jtw_node(nodes[0])).to.equal('{"col":0,"row":0}')
    expect(jtw_node(nodes[1])).to.equal('{"col":0,"row":1}')
    expect(jtw_node(nodes[2])).to.equal('{"col":0,"row":2}')
    expect(jtw_node(nodes[3])).to.equal('{"col":1,"row":3}')
    expect(jtw_node(nodes[4])).to.equal('{"col":2,"row":4}')
    expect(jtw_node(nodes[5])).to.equal('{"col":3,"row":5}')
    expect(jtw_node(nodes[6])).to.equal('{"col":0,"row":6}')
    expect(jtw_node(nodes[7])).to.equal('{"col":0,"row":7}')
  })

  // arcs
  // console.log(arcs[0])
  // console.log(jtw_arc(arcs[0]))
  it('expect arcs:', function() {
    expect(10).to.equal(arcs.length)
  })
})

describe('sample_git_log.G_demo_col_init_error', function() {
  const log_lines = sample_git_log.E_demo_col_init_error() // from --order-topo
  // console.log('log_lines', log_lines)

  const commits = parse_git_log.get_commit_objects_from_lines(log_lines)
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits)
  const { nodes, arcs } = parse_git_log.get_commit_nodes_and_arcs(commits)

  // log_lines
  it('expect log_lines:', function() {
    expect(13).to.equal(log_lines.length)
    expect(log_lines[0]).to.equal(
      '* ¡¨¡7a42c73¡¨¡33bd179¡¨¡commit 8 on branch bre¡¨¡Fri Nov 24 23:22:37 2017 +0100¡¨¡rudifa¡¨¡ (bre)¡¨¡'
    )
    expect(log_lines[12]).to.equal('* ¡¨¡e2c32ae¡¨¡¡¨¡initial commit¡¨¡Fri Nov 24 22:54:03 2017 +0100¡¨¡rudifa¡¨¡¡¨¡')
  })

  // commits
  // console.log('commits', commits)
  it('expect commits:', function() {
    expect(8).to.equal(commits.length)
    expect(jtw_commit(commits[0])).to.equal('{"sha":"7a42c73","parents":["33bd179"],"children":[]}')
    expect(jtw_commit(commits[1])).to.equal('{"sha":"62039f3","parents":["12b4472"],"children":[]}')
    expect(jtw_commit(commits[2])).to.equal('{"sha":"967dbb2","parents":["12b4472"],"children":[]}')
    expect(jtw_commit(commits[3])).to.equal(
      '{"sha":"12b4472","parents":["33bd179","afec16a"],"children":["62039f3","967dbb2"]}'
    )
    expect(jtw_commit(commits[4])).to.equal('{"sha":"33bd179","parents":["5b59f30"],"children":["7a42c73","12b4472"]}')
    expect(jtw_commit(commits[5])).to.equal('{"sha":"afec16a","parents":["5b59f30"],"children":["12b4472"]}')
    expect(jtw_commit(commits[6])).to.equal('{"sha":"5b59f30","parents":["e2c32ae"],"children":["33bd179","afec16a"]}')
    expect(jtw_commit(commits[7])).to.equal('{"sha":"e2c32ae","parents":[],"children":["5b59f30"]}')
  })

  // nodes
  // console.log(jtw_node(nodes[0]))
  it('expect nodes:', function() {
    expect(8).to.equal(nodes.length)
    expect(jtw_node(nodes[0])).to.equal('{"col":0,"row":0}')
    expect(jtw_node(nodes[1])).to.equal('{"col":1,"row":1}')
    expect(jtw_node(nodes[2])).to.equal('{"col":2,"row":2}')
    expect(jtw_node(nodes[3])).to.equal('{"col":1,"row":3}')
    expect(jtw_node(nodes[4])).to.equal('{"col":0,"row":4}')
    expect(jtw_node(nodes[5])).to.equal('{"col":2,"row":5}')
    expect(jtw_node(nodes[6])).to.equal('{"col":0,"row":6}')
    expect(jtw_node(nodes[7])).to.equal('{"col":0,"row":7}')
  })

  // arcs
  // console.log(arcs[0])
  // console.log(jtw_arc(arcs[0]))
  it('expect arcs:', function() {
    expect(8).to.equal(arcs.length)
  })
})

describe('sample_git_log.SimpleJSON', function() {
  const log_lines = sample_git_log.SimpleJSON()
  const commits = parse_git_log.get_commit_objects_from_lines(log_lines)
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits)
  const { nodes, arcs } = parse_git_log.get_commit_nodes_and_arcs(commits)

  // log_lines
  // console.log('log_lines', log_lines, log_lines.length)
  it('log_lines array length', function() {
    expect(79).to.equal(log_lines.length)
    expect(log_lines[1]).to.equal(
      '*   ¡¨¡07a1266¡¨¡d5584f0 5f6f8f3¡¨¡Merge pull request #32 from EvilPudding/master¡¨¡Sat Feb 6 21:41:02 2016 +0000¡¨¡Mike Anchor¡¨¡¡¨¡'
    )
    expect(log_lines[78]).to.equal('* ¡¨¡a1c581b¡¨¡¡¨¡Initial commit¡¨¡Tue Sep 21 19:25:23 2010 +0100¡¨¡MJPA¡¨¡¡¨¡')
  })

  // commits
  // console.log('commits[0]', JSON.stringify(commits[0]))
  // console.log('commits[0]', jtw_node(commits[0]))
  it('expect commits:', function() {
    expect(60).to.equal(commits.length)
    expect(jtw_commit(commits[0])).to.equal('{"sha":"611748a","parents":["07a1266"],"children":[]}')
    expect(jtw_commit(commits[1])).to.equal('{"sha":"07a1266","parents":["5f6f8f3","d5584f0"],"children":["611748a"]}')
    expect(jtw_commit(commits[59])).to.equal('{"sha":"a1c581b","parents":[],"children":["baab08b"]}')
  })

  // nodes
  // console.log(jtw_node(nodes[0]))
  it('expect nodes:', function() {
    expect(60).to.equal(nodes.length)
    expect(jtw_node(nodes[0])).to.equal('{"col":0,"row":0}')
    expect(jtw_node(nodes[1])).to.equal('{"col":0,"row":1}')
    expect(jtw_node(nodes[59])).to.equal('{"col":0,"row":59}')
  })

  // // arcs
  it('expect arcs:', function() {
    expect(68).to.equal(arcs.length)
    expect(2).to.equal(arcs[1].length)
    const arc_1 = arcs[1]
    expect(arc_1[0]).to.contain.all.keys(['col', 'row', 'commit'])
    expect(arc_1[1]).to.contain.all.keys(['col', 'row'])
    // expect([ 0, 1, 0, 3 ]).to.deep.equal([arc1[0].col, arc1[0].row, arc1[1].col, arc1[1].row ]);
  })
})
