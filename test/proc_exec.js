var expect    = require("chai").expect;
const exec = require('../src/proc-exec');

describe("sample test", function() {
  it("should pass", function() {
    expect(2).to.equal(1+1);
  });
  xit("should fail", function() {
    expect(2).to.equal(1);
  });
});

describe("proc-exec", function() {
  it("should execute the command and get the response", function(done) {
    const command = "git --version";
    exec.command(command, function(stdout, stderr) {
      //console.log(stdout, stderr);
      expect(stdout).to.match(/^git version \d\.\d{1,2}\.\d/); // git version 2.13.6 (Apple Git-96)
      expect(stderr).to.match(/^$/);
      done();
    });
  });
});
