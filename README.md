`gitcommitgrph` is an exercise in creating an Electron application for viewing the graph
of commits in a project using __git__.

`npm start` runs the app.

`require('electron-reload')([__dirname]);` in `view_gitgraph.js` reloads the app window on code changes.

`mocha` runs regression tests.

`mocha --watch --recursive` runs regression tests on code changes.


Work in progress.

NOTES:
```
git log --pretty formats and related options

%h abbrev-commit sha
%p parent shas
%d ref names
%s subject
%cd committer date
%an author name
-- all # default current branch
-- top-order # default
-- date-order
-C <directory>
```

DONE:
- displays a reasonable looking git graph
- test/*.js tests pass


TODO:
- improve arc shapes
- minimize overlapping of arcs and unrelated nodes
- expand user settings: separate handler; use config module (?)
- simplify node placement code
- separate columns for author, date, subject etc, scrollable and adjustable in width
- tooltips for full length text
- add branch and tag labels
