
const childproc = require('child_process');

const options = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 3000 * 1024, // from default 200 * 1024
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
};

const command = function(command, callback) {
  var parentproc = childproc.exec(command, options, function(error, stdout, stderr) {

    if (error) {
      console.log(error.stack);
      console.log('Error Code: '+error.code);
      console.log('Reason of error: '+error.signal);
      console.log('stderr: '+stderr);
    }
    console.log('stdout.length:', stdout.length);
    //console.log('Stdout value: ' + stdout);
    //console.log('Stderror value: ' + stderr);
    callback(stdout, stderr);
  });

  parentproc.on('exit', function (code) {
    // console.log('Child process is exiting with exit code: '+code);
  });
}

module.exports = {
  command: command
};

// see http://knowledgehills.com/nodejs/node-js-child-process-creation.htm
// see https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback
