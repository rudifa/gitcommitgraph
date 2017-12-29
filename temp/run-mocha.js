// https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
// this can be run width on of
//   node temp/run-mocha.js
//   node --inspect-brk  temp/run-mocha.js // in conjunction with Chrome NIM module

var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.
var mocha = new Mocha();

// var testDir = 'some/dir/test'
//
// // Add each .js file to the mocha instance
// fs.readdirSync(testDir).filter(function(file){
//     // Only keep the .js files
//     return file.substr(-3) === '.js';
//
// }).forEach(function(file){
//     mocha.addFile(
//         path.join(testDir, file)
//     );
// });

console.log('__dirname', __dirname)

const file = '../test/utils-set.js';
mocha.addFile(path.join(__dirname, file));

// Run the tests.
mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});
