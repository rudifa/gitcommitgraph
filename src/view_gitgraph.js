console.log('view_gitgraph ...');

const { ipcRenderer } = require('electron');
const settings = require('electron-settings');

// Listen for messages from main
ipcRenderer.on('dir-selected', (event, directory) => {
  console.log('renderer: dir-selected:', directory);
  get_git_log_and_plot(directory);
});
let git_log_order = 'topo-order';
ipcRenderer.on('git-log-order', (event, order) => {
  console.log('renderer: git-log-order:', order);
  git_log_order = order;
  get_git_log_and_plot(null); // will get from settings
});

function get_sample_and_plot() {
  const sample_git_log = require('../test/sample_git_log');
  parse_and_plot(sample_git_log.lines);
}

function get_git_log_and_plot(directory) {
  if (!directory) {
    directory = get_git_directory();
    console.log('renderer: directory=', directory);
  }
  if (!directory) {
    return;
  }
  const exec = require('./proc-exec');
  // console.log('exec:', exec, typeof exec);
  // console.log('directory:', directory);
  const command = `git -C ${directory} log --${git_log_order} --graph --all --pretty=format:'¡¨¡%h¡¨¡%p¡¨¡%d¡¨¡%s¡¨¡%ci¡¨¡%an¡¨¡' --abbrev-commit --date=short --decorate=full`;
  exec.command(command, function(stdout, stderr) {
    console.log('command:', command);
    // console.log('response:', stdout);
    // console.log('error:', stderr);
    if (!stderr.match(/^fatal: /)) {
      const git_log_lines = stdout.split('\n');
      // console.log('git_log_lines[0]:', git_log_lines[0]);
      set_git_directory(directory);
      parse_and_plot(directory, git_log_lines);
    } else {
      // TODO provide a message to the user
      console.log('error:', stderr);
    }

  });
}

function parse_and_plot(directory, log_lines) {
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

  plot_git_log.plot_git_log(directory, nodes_and_arcs);
}

//get_sample_and_plot();
//get_git_log_and_plot('.');

function set_git_directory(dir) {
  if (dir) {
    settings.set('git_directory', dir);
    console.log('settings.set git_directory', dir)
  }
}

function get_git_directory() {
  try {
    const dir = settings.get('git_directory');
    console.log('settings.get git_directory', dir)
    return dir;
  } catch(err) {
    return null;
  }
}
