console.log('view_gitgraph ...');

const { ipcRenderer } = require('electron');
// const settings = require('electron-settings');
const settings = require('electron').remote.require('electron-settings');

// Listen for messages from main
ipcRenderer.on('render-now', (event, directory) => {
  get_git_log_and_plot();
});

settings.watch('arc-style', (newValue, oldValue) => {
  get_git_log_and_plot();
});

settings.watch('git-log-order', (newValue, oldValue) => {
  get_git_log_and_plot();
});

settings.watch('git-directory', (newValue, oldValue) => {
  // console.log('git-log-order', oldValue, '->', newValue);
  get_git_log_and_plot();
});

function get_sample_and_plot() {
  const sample_git_log = require('../test/sample_git_log');
  parse_and_plot(sample_git_log.lines);
}

function get_git_log_and_plot() {

  let directory = settings.get('git-directory', '');
  console.log('renderer: directory=', directory);

  const exec = require('./proc-exec');
  // console.log('exec:', exec, typeof exec);
  // console.log('directory:', directory);
  const git_log_order = settings.get('git-log-order', 'topo-order');
  const command = `git -C ${directory} log --${git_log_order} --graph --all --pretty=format:'¡¨¡%h¡¨¡%p¡¨¡%d¡¨¡%s¡¨¡%ci¡¨¡%an¡¨¡' --abbrev-commit --date=short --decorate=full`;
  exec.command(command, function(stdout, stderr) {
    console.log('command:', command);
    // console.log('response:', stdout);
    // console.log('error:', stderr);
    if (stderr.match(/^(error|fatal): /)) {
      console.log(stderr);
      parse_and_plot('Please select a git directory', [], '');
    } else {
      const git_log_lines = stdout.split('\n');
      const arc_style = settings.get('arc-style', 'quadratic-bézier-vertical');
      // console.log('git_log_lines[0]:', git_log_lines[0]);
      // set_git_directory(directory);
      parse_and_plot(directory, git_log_lines, arc_style);
    }
  });
}

function parse_and_plot(directory, log_lines, arc_style) {
  const parse_git_log = require('./parse_git_log');
  // console.log('sample_git_log.lines[0]=', log_lines[0]);
  const plot_git_log = require('./plot_git_log');

  const verbose = true;
  const commits = parse_git_log.get_commit_objects_from_lines(log_lines);
  // console.log('commits[0]=', commits[0]);
  const nodes_and_arcs = parse_git_log.get_commit_nodes_and_arcs(commits, verbose);
  // console.log('nodes_and_arcs=', nodes_and_arcs);
  // console.log('nodes_and_arcs[0].nodes=', nodes_and_arcs.nodes[0]);
  // console.log('nodes_and_arcs[0].arcs=', nodes_and_arcs.arcs[0]);

  plot_git_log.plot_git_log(directory, nodes_and_arcs, arc_style);
}
