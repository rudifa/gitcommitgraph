const { expect } = require('chai');
const { Colowners } = require('../src/utils-set.js');

describe('Colowners', function() {
  let colowners;
  let nodes;

  beforeEach(function () {
    colowners = new Colowners();
    nodes = [
      { col: -1, sha: 11111 },
      { col: -1, sha: 22222 },
      { col: -1, sha: 33333 },
      { col: -1, sha: 44444 },
      { col: -1, sha: 55555 }
    ]
  });

  it('Colowners should have methods:', function() {
    expect(colowners.set_node_col).to.be.a('function');
    expect(colowners.free_col).to.be.a('function');
    expect(colowners.owns_its_col).to.be.a('function');
    expect(colowners.first_free_col).to.be.a('function');
  });
  it('Taken should have methods that cooperate', function() {
    expect(0).to.equal(colowners.first_free_col());
    expect(0).to.equal(colowners.first_free_col());

    expect(-1).to.equal(nodes[2].col);
    expect(-1).to.equal(nodes[4].col);
    colowners.set_node_col(nodes[4], colowners.first_free_col());
    expect(0).to.equal(nodes[4].col);
    expect(1).to.equal(colowners.first_free_col());
    expect(-1).to.equal(nodes[2].col);
    expect(0).to.equal(nodes[4].col);
    expect(colowners.owns_its_col(nodes[2])).to.be.false;
    expect(colowners.owns_its_col(nodes[4])).to.be.true;

    // console.log('colowners=', colowners.toString())

    colowners.set_node_col(nodes[2], nodes[4].col);
    expect(colowners.owns_its_col(nodes[2])).to.be.true;
    expect(colowners.owns_its_col(nodes[4])).to.be.false;
    expect(0).to.equal(nodes[4].col);
    expect(0).to.equal(nodes[2].col);

    colowners.free_col(nodes[4].col);
    expect(0).to.equal(colowners.first_free_col());
    expect(0).to.equal(nodes[4].col);
    expect(0).to.equal(nodes[2].col);
    expect(colowners.owns_its_col(nodes[2])).to.be.false;
    expect(colowners.owns_its_col(nodes[4])).to.be.false;


  });

})
