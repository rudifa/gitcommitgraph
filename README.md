`gitcommitgraph` is an exercise in creating an Electron application for viewing the graph
of commits in a project using __git__.

`npm start` runs the app.

`require('electron-reload')([__dirname]);` in `view_gitgraph.js` reloads the app window on code changes.

`electron-mocha` runs regression tests, or equivalently

`npm test`

`mocha --watch --recursive` runs regression tests on code changes -- not any more.
We now use `electron-mocha`, to be able to test modules using the electron app.


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

*BUGS:*

/Users/rudifarkas/GitHub/desktop *** Type error: cannot read property 'commit' of undefined FIXED WITH BUFFER SIZE
(parent not found in nodedict - should add check of consistency and a workaround)
/Users/rudifarkas/GitHub/desktop *** Lost merge arcs
/Users/rudifarkas/GitHub/d3 *** Type error: cannot read property 'commit' of undefined FIXED WITH BUFFER SIZE
/Users/rudifarkas/GitHub/d3 *** Lost merge arcs
/Users/rudifarkas/GitHub/d3-cookbook *** Lost merge arcs (224 commits)
/Users/rudifarkas/GitHub/electron-settings LOOKS GOOD but compare with GitX


git log --pretty=format:'¡¨¡%h¡¨¡%p¡¨¡%s¡¨¡%cd¡¨¡%an¡¨¡%d¡¨¡' --all --topo-order > ${D}-glog-topo.txt
produces 13854 lines (per atm editor) or one less per wc -l
desktop $ wc -l *.txt
   13853 desktop-glog-date.txt
   13853 desktop-glog-topo.txt
commit_objects.length == 1183
nodes.length == 1183
get_commit_objects_from_lines lines.length == 1925

Did we silently stop parsing? Yes, silently because I silenced it in proc-exec.js
did we hit some buffer size limit? yes.
should we stream data to parser? probably not possible with stdout of child_proc

const options = {
  encoding: 'utf8',
  timeout: 0,
  maxBuffer: 3000 * 1024, // from default 200 * 1024
  killSignal: 'SIGTERM',
  cwd: null,
  env: null
};

This fixes the problem
topo: stdout.length == 2296956 bytes

dev14, tag looks_promising_but: problem in ElectronTutorial;
  Looks like we also have a problem with the 2 earliest merges
  Yes, we do: when a merge branch's 1st parent is to the left,
  we place the 2nd parent underneath on the same col; then the arc from merge node
  to the 1st parent overlaps with that to the 2nd parent
  Looks like we can place the 1st parent on the same col, but not the 2nd parent
