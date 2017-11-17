console.log('gitgraph_main');

function get_sample_and_plot() {
  const sample_git_log = require('../test/sample_git_log');

  parse_and_plot(sample_git_log.lines);
}

function get_git_and_plot() {
  const exec = require('./proc-exec');
  console.log('exec:', exec, typeof exec);
  const command = "git log --graph --pretty=format:'|=;%h|=;%p|=;%d|=;%s|=;%cd|=;%an|=;' --abbrev-commit --date=short --decorate=full";
  exec.command(command, function(stdout, stderr) {
    console.log('command:', command);
    console.log('response:', stdout);
    console.log('error:', stderr);

    const git_log_lines = stdout.split('\n');
    console.log('git_log_lines[0]:', git_log_lines[0]);

    parse_and_plot(git_log_lines);
  });
}

function parse_and_plot(log_lines) {
  const parse_git_log = require('./parse_git_log');
  console.log('sample_git_log.lines[0]=', log_lines[0]);
  const plot_git_log = require('./plot_git_log');

  const commits = parse_git_log.get_commit_objects_from_lines(log_lines);
  console.log('commits[0]=', commits[0]);
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits);
  console.log('nodes_and_arcs=', nodes_and_arcs);
  console.log('nodes_and_arcs[0].nodes=', nodes_and_arcs.nodes[0]);
  console.log('nodes_and_arcs[0].arcs=', nodes_and_arcs.arcs[0]);

  plot_git_log.plot_git_log(nodes_and_arcs);
}

//get_sample_and_plot();
get_git_and_plot();
