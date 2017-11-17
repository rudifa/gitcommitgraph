
const childproc = require('child_process');

const command = function(command, callback) {
   var parentproc = childproc.exec(command, function(error, stdout, stderr) {

      if (error) {
         // console.log(error.stack);
         // console.log('Error Code: '+error.code);
         // console.log('Reason of error: '+error.signal);
      }
      //console.log('Stdout value: ' + stdout);
      //console.log('Stderror value: ' + stderr);
      callback(stdout + stderr);
   });

   parentproc.on('exit', function (code) {
      //console.log('Child process is exiting with exit code: '+code);
   });
}

module.exports = {
  command: command
};

// see http://knowledgehills.com/nodejs/node-js-child-process-creation.htm
