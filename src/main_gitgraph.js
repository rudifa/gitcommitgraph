console.log('gitgraph_main');


const sample_git_log = require('../test/sample_git_log');
const parse_git_log = require('./parse_git_log');
console.log('sample_git_log.lines[0]=', sample_git_log.lines[0]);
const plot_git_log = require('./plot_git_log');

const commits = parse_git_log.get_commit_objects_from_lines(sample_git_log.lines);
console.log('commits[0]=', commits[0]);
const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits);
console.log('nodes_and_arcs=', nodes_and_arcs);
console.log('nodes_and_arcs[0].nodes=', nodes_and_arcs.nodes[0]);
console.log('nodes_and_arcs[0].arcs=', nodes_and_arcs.arcs[0]);

plot_git_log.plot_git_log(nodes_and_arcs);
