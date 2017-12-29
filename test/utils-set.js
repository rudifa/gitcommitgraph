const { expect } = require('chai');
const { Colowners } = require('../src/utils-set.js');

describe('Colowners', function() {
  let colowners;
  let nodes;

  beforeEach(function () {
    colowners = new Colowners();
    nodes = [
      { col: -1, commit: { sha: 111 } },
      { col: -1, commit: { sha: 222 } },
      { col: -1, commit: { sha: 333 } },
      { col: -1, commit: { sha: 444 } },
      { col: -1, commit: { sha: 555 } }
    ]
  });


  it('Colowners should have methods:', function() {
    expect(colowners.set_node_col).to.be.a('function');
    expect(colowners.free_col).to.be.a('function');
    expect(colowners.owns_its_col).to.be.a('function');
    expect(colowners.first_free_col).to.be.a('function');
    expect(colowners.max_used_col).to.be.a('function');
  });

  it('Colowners should have methods that cooperate with nodes:', function() {
    // initial state
    expect(-1).to.equal(colowners.max_used_col());
    expect(0).to.equal(colowners.first_free_col());
    expect('{}').to.equal(colowners.toString());
    expect('[{"col":-1,"commit":{"sha":111}},{"col":-1,"commit":{"sha":222}},{"col":-1,"commit":{"sha":333}},{"col":-1,"commit":{"sha":444}},{"col":-1,"commit":{"sha":555}}]')
      .to.equal(JSON.stringify(nodes));

    // nodes[4] gets col == 0 from colowners
    colowners.set_node_col(nodes[4], colowners.first_free_col());
    //expect(0).to.equal(colowners.max_used_col());
    expect(0).to.equal(colowners.max_used_col());
    expect(1).to.equal(colowners.first_free_col());
    expect(colowners.owns_its_col(nodes[2])).to.be.false;
    expect(colowners.owns_its_col(nodes[4])).to.be.true;
    expect('{"0":555}').to.equal(colowners.toString());
    expect('[{"col":-1,"commit":{"sha":111}},{"col":-1,"commit":{"sha":222}},{"col":-1,"commit":{"sha":333}},{"col":-1,"commit":{"sha":444}},{"col":0,"commit":{"sha":555}}]')
      .to.equal(JSON.stringify(nodes));

    // nodes[0] gets col==1 from colowners
    colowners.set_node_col(nodes[0], colowners.first_free_col());
    expect(1).to.equal(colowners.max_used_col());
    expect(2).to.equal(colowners.first_free_col());
    expect(colowners.owns_its_col(nodes[0])).to.be.true;
    expect(colowners.owns_its_col(nodes[2])).to.be.false;
    expect(colowners.owns_its_col(nodes[4])).to.be.true;
    expect('{"0":555,"1":111}').to.equal(colowners.toString());
    expect('[{"col":1,"commit":{"sha":111}},{"col":-1,"commit":{"sha":222}},{"col":-1,"commit":{"sha":333}},{"col":-1,"commit":{"sha":444}},{"col":0,"commit":{"sha":555}}]')
      .to.equal(JSON.stringify(nodes));

    // [2] takes ownership of col==0 from [4]
    colowners.set_node_col(nodes[2], nodes[4].col);
    // now both hold it, but only [2] owns it
    expect(1).to.equal(colowners.max_used_col());
    expect(2).to.equal(colowners.first_free_col());
    expect(colowners.owns_its_col(nodes[2])).to.be.true;
    expect(colowners.owns_its_col(nodes[4])).to.be.false;
    expect('{"0":333,"1":111}').to.equal(colowners.toString());
    expect(0).to.equal(nodes[4].col);
    expect(0).to.equal(nodes[2].col);
    expect('[{"col":1,"commit":{"sha":111}},{"col":-1,"commit":{"sha":222}},{"col":0,"commit":{"sha":333}},{"col":-1,"commit":{"sha":444}},{"col":0,"commit":{"sha":555}}]')
      .to.equal(JSON.stringify(nodes));

    // free col==0 held by [4]
    colowners.free_col(nodes[4].col);
    // now col==0 is free
    expect(1).to.equal(colowners.max_used_col());
    expect(0).to.equal(colowners.first_free_col());
    expect('{"1":111}').to.equal(colowners.toString());
    // but [2] and [4] still hold it
    expect('[{"col":1,"commit":{"sha":111}},{"col":-1,"commit":{"sha":222}},{"col":0,"commit":{"sha":333}},{"col":-1,"commit":{"sha":444}},{"col":0,"commit":{"sha":555}}]')
      .to.equal(JSON.stringify(nodes));
    // although they don't own it
    expect(colowners.owns_its_col(nodes[2])).to.be.false;
    expect(colowners.owns_its_col(nodes[4])).to.be.false;

    // free col == 1 held by [0]
    colowners.free_col(nodes[0].col);
    // now col==0 is free
    expect(-1).to.equal(colowners.max_used_col());
    expect(0).to.equal(colowners.first_free_col());
    expect('{}').to.equal(colowners.toString());
    // but [2] and [4] still hold it
    expect('[{"col":1,"commit":{"sha":111}},{"col":-1,"commit":{"sha":222}},{"col":0,"commit":{"sha":333}},{"col":-1,"commit":{"sha":444}},{"col":0,"commit":{"sha":555}}]')
      .to.equal(JSON.stringify(nodes));
    // although they don't own it
    expect(colowners.owns_its_col(nodes[2])).to.be.false;
    expect(colowners.owns_its_col(nodes[4])).to.be.false;

  });

})
