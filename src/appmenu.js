function add_application_menu(get_and_open_git_directory, get_git_log_order) {

  const { app, Menu } = require('electron');

  const menuTemplate = [
    {
      label: 'Electron',
      submenu: [
        {
          label: 'About ...',
          click: () => {
            console.log('About Clicked');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          click: () => { app.quit(); }
        }
      ]
    },
    {
      label: 'File',
      submenu: [
        {
          label: 'Open git project...',
          click () {
            // console.log('Open git project');
            get_and_open_git_directory();
          }
        },
        { type: 'separator' },
        {
          type: 'radio',
          label: 'topo order',
          click () {
            // console.log('topo order');
            get_git_log_order('topo-order');
          }
        },
        {
          type: 'radio',
          label: 'date order',
          click () {
            // console.log('date order');
            get_git_log_order('date-order');
          }
        }
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { console.log('Learn More') }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

module.exports = add_application_menu;
