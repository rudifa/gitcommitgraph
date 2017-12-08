
// MUST RUN THIS TEST WITH electron-mocha

const { expect } = require('chai');
const { app, Menu, dialog } = require('electron');

const appmenu = require('../src/appmenu.js')();


function getMenuItem(menu, label) {
  for (i in menu.items) {
    const it = menu.items[i];
    if (it.label == label) {
      return it;
    }
  }
  return null;
}


console.log('typeof appmenu.items', typeof appmenu.items);
console.log('appmenu.items.length', appmenu.items.length);
console.log('typeof appmenu.items[0]', typeof appmenu.items[0]);
for (let i = 0; i < appmenu.items.length; i++) {
  console.log('i=', i, appmenu.items[i].label)
}

describe('appmenu', function() {

  it('appmenu should exist:', function() {
    //expect(appmenu).to.be.an('object'); // fails ?!
    expect('object').to.equal(typeof appmenu);
  });

  it('appmenu should have item View:', function() {
    const item = getMenuItem(appmenu, 'View')
    expect('object').to.equal(typeof item);
    expect('View').to.equal(item.label);
    expect('object').to.equal(typeof item.submenu);
    // console.log('submenu', item.submenu.items.length)
    expect(1).to.equal(item.submenu.items.length);
    expect(5).to.equal(item.submenu.items[0].submenu.items.length);
    expect('linear').to.equal(item.submenu.items[0].submenu.items[0].label);
    expect(item.submenu.items[0].submenu.items[0].checked).to.be.true;
    expect(item.submenu.items[0].submenu.items[1].checked).to.be.false;

    expect('linear').to.equal(appmenu.items[3].submenu.items[0].submenu.items[0].label);

    // so, we could have an ad-hoc access to these radio items

    for (let i = 0; i < item.submenu.items[0].submenu.items.length; i++) {
      let sit = item.submenu.items[0].submenu.items[i];
      // console.log('i=', i, sit.type, sit.label, sit.checked);
    }

  });

});
