2017-12-03

Expand Menu and settings

Up to now we have

- index.js (main process) defines 2 action functions get_and_open_git_directory, get_git_log_order)
  and passes these to appmenu on creation

- ApplicationMenu action functions are bound to onClick handlers
  onClick, these functions may do some main process work (file dialog etc), and
  emit events, mainWindow.webContents.send('dir-selected', ...

- view_gitgraph.js (renderer process) listens to events, e.g. ipcRenderer.on('dir-selected',...

  It also stores settings (git-dir) in Settings and launches actions (update git log display).
  Currently, git_log_order is stored in a variable in view_gitgraph.

For now the menu is not initialized from Settings as it should be.

It looks like we should be using from renderer a remote access to settings in main process,
and set up watch to react.

TODO:
- move settings from view_gitgraph.js to index.js
- attach settings to the app?

- first work out a connection for arc line type along using the mechanism discussed above
  if OK, migrate other Settings

TODO:
- revise Colowners:
-- probably should tighten methods, so that getting the first free column and
giving it to a node are in the same method
-- probably should also set node column to -1 when freed, if owned 



SEE ALSO:
[Bit-Booster - Offline Commit Graph Drawing Tool](http://bit-booster.com/graph.html)


electron-settings
gitcommitgraph $ cat "/Users/rudifarkas/Library/Application Support/Electron/Settings"
{"git_directory":"/Users/rudifarkas/Dev/js/electron/gitcommitgraph"}
