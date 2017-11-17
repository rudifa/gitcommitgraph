// define(function () {
  //console.log('parse_git_log_out.js enter');

  /*
  Purpose: parse git history from
  git log --graph --pretty=format:'|=;%h|=;%p|=;%d|=;%s|=;%cd|=;%an|=;' --abbrev-commit --date=short --decorate=full > git_log_out.txt

  * |=;611748a|=;07a1266|=; (HEAD -> refs/heads/master, refs/remotes/origin/master, refs/remotes/origin/HEAD)|=;Allow a JSONValue to be created from an int|=;2016-07-06|=;Mike Anchor|=;
  *   |=;07a1266|=;d5584f0 5f6f8f3|=;|=;Merge pull request #32 from EvilPudding/master|=;2016-02-06|=;Mike Anchor|=;
  |\
  | * |=;5f6f8f3|=;7ce5b58|=;|=;Optimization.|=;2015-12-11|=;EvilPudding|=;
  * |   |=;d5584f0|=;7ce5b58 40b75f2|=;|=;Merge pull request #30 from fokede/master|=;2016-02-06|=;Mike Anchor|=;
  |\ \
  | |/
  |/|
  | * |=;40b75f2|=;7ce5b58|=;|=;MinGW compatibility fix|=;2015-10-25|=;fokede|=;
  |/
  *   |=;7ce5b58|=;7682af4 36e066d|=;|=;Merge pull request #27 from Robien/master|=;2015-08-22|=;Mike Anchor|=;
  ...
  in view of drawing a git history graph.

  */

  function console_log(title, array) {
    console.log(title + ':');
    if (Array.isArray(array)) {
      array = array.slice(0,3);
      array.forEach(function(item) {
        console.log(item);
      })
      console.log('...');
    }
  }

  function get_commit_objects_from_lines(lines) {

    // lines: input array of text lines, e.g.
    // | * |=;bcc51ee|=;ad82167|=; (tag: refs/tags/rudifa)|=;Added the Prettyprint extension:|=;2013-11-03|=;Rudi Farkas|=;
    // Split on separator string '|=;' and return an object for each matching line

    var objects = [];
    lines.forEach(function(line) {
      var cp = line.split('|=;');
      if (cp.length == 8) {
        var object = { graph: cp[0],
                        sha: cp[1],
                        parents: cp[2].split(' '),
                        refs: cp[3],
                        summary: cp[4],
                        date: cp[5],
                        author: cp[6]
                        // empty cp[7]
                      };
        objects.push(object);
      }
    });
    return objects;
  }

  function get_commit_nodes_and_arcs(commit_objects) {

    // Analyze commit object similar to
    //  { graph: '*   ', sha: '07a1266', parents: [ 'd5584f0', '5f6f8f3' ], refs: '', summary: 'Merge pull request #32 from EvilPudding/master', date: '2016-02-06', author: 'Mike Anchor' }
    // Create arrays nodes, arcs where
    //  node: { col: ..., row: ..., commit: ..., ...}
    //  arc: { node: { col: ..., row: ... }, parent: { col: ..., row: ... } }

    var nodes = [];
    for (var i = 0; i < commit_objects.length; i++) {
      const commit = commit_objects[i];
      const column = commit.graph.indexOf('*') / 2;
      const node = { col: column, row: i, commit: commit };
      nodes.push(node);
    }

    var arcs = [];
    for (var i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.commit.parents.forEach(function(parentSha) {
        const indexOfParent = nodes.findIndex(function(node, index) {
           return (parentSha == node.commit.sha);
        });
        if (indexOfParent >= 0) {
          const parent = nodes[indexOfParent];
          arcs.push([ node, parent]);
        }
      });
    }

    return { nodes: nodes, arcs: arcs };
  }

  module.exports = {
    get_commit_objects_from_lines: get_commit_objects_from_lines,
    get_commit_nodes_and_arcs: get_commit_nodes_and_arcs
  };
