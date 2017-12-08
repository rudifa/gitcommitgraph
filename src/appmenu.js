function add_application_menu() {

  const { app, Menu, dialog } = require('electron');

  const settings = require('electron-settings');

  const value = settings.getAll();
  console.log('settings value:', value);

  function set_arc_style(style) {
    console.log('arc-style', style);
    settings.set('arc-style', style);
  }

  function set_git_log_order(order) {
    console.log('git-log-order', order);
    settings.set('git-log-order', order);
  }

  function set_git_directory() {
    console.log('set_git_directory =>');
    // const { dialog } = require('electron');
    dialog.showOpenDialog({ properties: [ 'openDirectory' ]}, function (dirNames) {

        if (dirNames === undefined) {
           console.log("No directory selected");
        } else {
          console.log("menu: directory selected=", dirNames[0]);
          settings.set('git-directory', dirNames[0]);
        }
     });
  }


  function set_radio_item_checked(radio_items, item_label) {
    for (let i = 0; i < radio_items.length; i++) {
      let item = radio_items[i];
      if (item_label == item.label) {
        item.checked = true;
        break;
      }
    }
  }

  function set_git_log_order_checked(menu, settings) {
    set_radio_item_checked(menu.items[1].submenu.items, settings.get('git-log-order'));
  }

  function set_arc_style_checked(menu, settings) {
    set_radio_item_checked(menu.items[3].submenu.items[0].submenu.items, settings.get('arc-style'));
  }

  const menuTemplate = [
    { label: 'GCG',
      submenu: [
        { label: 'About ...', click: () => { console.log('About Clicked'); } },
        { type: 'separator' },
        { label: 'Quit', click: () => { app.quit(); } }
      ]
    },
    { label: 'File',
      submenu: [
        { label: 'Open git project...', click () {  set_git_directory(); } },
        { type: 'separator' },
        { type: 'radio', label: 'topo-order', click () { set_git_log_order('topo-order'); } },
        { type: 'radio', label: 'date-order', click () { set_git_log_order('date-order'); } }
      ]
    },
    { label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    { label: "View",
      submenu: [
        { label: "Arc style", submenu: [
            { type: 'radio', label: "linear", click(){ set_arc_style("linear")} },
            { type: 'radio', label: "cubic-bézier", click(){ set_arc_style("cubic-bézier")} },
            { type: 'radio', label: "quadratic-bézier", click(){ set_arc_style("quadratic-bézier")} },
            { type: 'radio', label: "cubic-bézier-vertical", click(){ set_arc_style("cubic-bézier-vertical")} },
            { type: 'radio', label: "quadratic-bézier-vertical", click(){ set_arc_style("quadratic-bézier-vertical")} }
          ]
        }
      ]
    },
    { role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    { role: 'help',
      submenu: [
        { label: 'Learn More', click () { console.log('Learn More') } }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  set_git_log_order_checked(menu, settings);
  set_arc_style_checked(menu, settings);

  return menu;  // for testing only
}

module.exports = add_application_menu;
