const expect    = require("chai").expect;
const parse_git_log = require('../src/parse_git_log');
const sample_git_log = require('./sample_git_log');


describe("sample_test", function(){
  it('should pass', function(){
    expect(true);
  })
})

describe("sample_git_log", function(){
  var sample_git_log_lines = sample_git_log.lines;
  it('sample_git_log_lines should return lines, array of 79 strings', function(){
    expect(79).to.equal(sample_git_log_lines.length);
  })
  it('sample_git_log_lines[1] should be ...', function(){
    expect('*   |=;07a1266|=;d5584f0 5f6f8f3|=;|=;Merge pull request #32 from EvilPudding/master|=;2016-02-06|=;Mike Anchor|=;')
      .to.equal(sample_git_log_lines[1]);
  })
  it('sample_git_log_lines[78] should be ...', function(){
    expect('* |=;a1c581b|=;|=;|=;Initial commit|=;2010-09-21|=;MJPA|=;')
      .to.equal(sample_git_log_lines[78]);
  })
})

describe("parse_sample_git_log", function(){
  var lines = sample_git_log.lines;
  var objects = parse_git_log.get_commit_objects_from_lines(lines);
  var nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(objects);

  // objects
  it('parse_sample_git_log.get_commit_objects_from_lines should return array of 60 objects', function(){
    expect(60).to.equal(objects.length);
  })
  it('objects[1] should be ...', function(){
    expect({ graph: '*   ', sha: '07a1266', parents: [ 'd5584f0', '5f6f8f3' ], refs: '', summary: 'Merge pull request #32 from EvilPudding/master', date: '2016-02-06', author: 'Mike Anchor' })
      .to.deep.equal(objects[1]);
  })
  it('objects[59] should be ...', function(){
    expect({ graph: '* ', sha: 'a1c581b', parents: [ '' ], refs: '', summary: 'Initial commit', date: '2010-09-21', author: 'MJPA' })
      .to.deep.equal(objects[59]);
  })

  // nodes
  it('parse_sample_git_log.get_commit_nodes_and_arcs should return an object', function(){
    expect(['nodes', 'arcs']).to.deep.equal(Object.keys(nodes_and_arcs));
  })
  it('nodes_and_arcs.nodes should be an array', function(){
    expect(60).to.deep.equal(nodes_and_arcs.nodes.length);
  })
  it('nodes_and_arcs.nodes[2] should be ...', function(){
    expect({ col: 1, row: 2, commit: { graph: '| * ', sha: '5f6f8f3', parents: [ '7ce5b58' ], refs: '', summary: 'Optimization.', date: '2015-12-11', author: 'EvilPudding' } })
      .to.deep.equal(nodes_and_arcs.nodes[2]);
  })

  // arcs
  it('nodes_and_arcs.arcs should be an array', function(){
    expect(68).to.equal(nodes_and_arcs.arcs.length);
  })
  it('nodes_and_arcs.arcs[1] should be array[2]', function(){
    expect(2).to.equal(nodes_and_arcs.arcs[1].length);
  })
  it('nodes_and_arcs.arcs[1][] elements should be objects with ...', function(){
    const arc1 = nodes_and_arcs.arcs[1];
    expect([ 'col', 'row', 'commit']).to.deep.equal(Object.keys(arc1[0]));
    expect([ 'col', 'row', 'commit']).to.deep.equal(Object.keys(arc1[1]));
    expect([ 0, 1, 0, 3 ]).to.deep.equal([arc1[0].col, arc1[0].row, arc1[1].col, arc1[1].row ]);
  })
})
