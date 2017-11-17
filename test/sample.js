var expect    = require("chai").expect;

describe("sample test", function() {
    it("should pass", function() {
      expect(2).to.equal(1+1);
    });
    it("should fail", function() {
      expect(2).to.equal(1);
    });
});
