
module.exports = {
  A_single_merge__topo:             A_single_merge__topo,
  B_branches_only__topo:            B_branches_only__topo,
  C_merge_3_into_master__topo:      C_merge_3_into_master__topo,
  F_octo_merge_3_into_master__topo: F_octo_merge_3_into_master__topo,
  G_demo_col_init_error__topo:      G_demo_col_init_error__topo,
  G_demo_col_init_error__date:      G_demo_col_init_error__date,
  H_criss_cross__topo:              H_criss_cross__topo,
  K_simple_branch_merge__topo:      K_simple_branch_merge__topo,
  SimpleJSON:                       SimpleJSON
};

/*
  Note: each exported function returns an array of strings, one per line of git log.
*/


function A_single_merge__topo() {
  function heredoc() { /*
        *   ¡¨¡bca8687¡¨¡a34017e d01380d¡¨¡Merge branch 'refs/heads/b1'¡¨¡Fri Nov 24 19:53:00 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
        |\
        | * ¡¨¡d01380d¡¨¡66f3a45¡¨¡4th¡¨¡Fri Nov 24 19:51:32 2017 +0100¡¨¡rudifa¡¨¡ (b1)¡¨¡
        * | ¡¨¡a34017e¡¨¡66f3a45¡¨¡3rd¡¨¡Fri Nov 24 19:48:47 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
        |/
        * ¡¨¡66f3a45¡¨¡d14aa55¡¨¡2nd¡¨¡Fri Nov 24 19:46:41 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
        * ¡¨¡d14aa55¡¨¡¡¨¡initial¡¨¡Fri Nov 24 19:40:38 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
        */};
        return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}


function B_branches_only__topo() {
  function heredoc() { /*
        * ¡¨¡7165a30¡¨¡1f7f761¡¨¡6 on master¡¨¡Wed Nov 29 09:53:59 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
        | * ¡¨¡4b8a42d¡¨¡1f7f761¡¨¡5 on branch_4¡¨¡Wed Nov 29 09:52:56 2017 +0100¡¨¡rudifa¡¨¡ (branch_4)¡¨¡
        |/
        * ¡¨¡1f7f761¡¨¡419429a¡¨¡3 on master¡¨¡Sun Nov 26 11:42:49 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
        | * ¡¨¡331947e¡¨¡419429a¡¨¡4 on branch_b¡¨¡Sun Nov 26 11:44:06 2017 +0100¡¨¡rudifa¡¨¡ (branch_b)¡¨¡
        |/
        | * ¡¨¡7ba98b0¡¨¡419429a¡¨¡2 on branch _a¡¨¡Sun Nov 26 11:42:15 2017 +0100¡¨¡rudifa¡¨¡ (branch_a)¡¨¡
        |/
        * ¡¨¡419429a¡¨¡2882080¡¨¡1 on master¡¨¡Sun Nov 26 11:41:26 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
        * ¡¨¡2882080¡¨¡¡¨¡initial commit¡¨¡Sun Nov 26 11:40:40 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
        */};
        return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}


function C_merge_3_into_master__topo() {
  function heredoc() { /*
    *   ¡¨¡59fe04b¡¨¡6e3cc48 694959a¡¨¡Merge branch 'branch3'¡¨¡Fri Dec 1 17:48:57 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
    |\
    | * ¡¨¡694959a¡¨¡8857cdb¡¨¡branch 3¡¨¡Fri Dec 1 17:48:55 2017 +0100¡¨¡rudifa¡¨¡ (branch3)¡¨¡
    * |   ¡¨¡6e3cc48¡¨¡69cccee 1b8f801¡¨¡Merge branch 'branch1'¡¨¡Fri Dec 1 17:48:56 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    |\ \
    | * | ¡¨¡1b8f801¡¨¡8857cdb¡¨¡branch 1¡¨¡Fri Dec 1 17:48:52 2017 +0100¡¨¡rudifa¡¨¡ (branch1)¡¨¡
    | |/
    * |   ¡¨¡69cccee¡¨¡5168e7a 6b2cb75¡¨¡Merge branch 'branch2'¡¨¡Fri Dec 1 17:48:54 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    |\ \
    | * | ¡¨¡6b2cb75¡¨¡8857cdb¡¨¡branch 2¡¨¡Fri Dec 1 17:48:53 2017 +0100¡¨¡rudifa¡¨¡ (branch2)¡¨¡
    | |/
    * | ¡¨¡5168e7a¡¨¡8857cdb¡¨¡commit directly on master¡¨¡Fri Dec 1 17:48:51 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    |/
    * ¡¨¡8857cdb¡¨¡¡¨¡initial¡¨¡Fri Dec 1 17:48:50 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    */};
    return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}



function F_octo_merge_3_into_master__topo() {
  function heredoc() { /*
    * ¡¨¡6b49d9e¡¨¡3c36210¡¨¡master¡¨¡Fri Dec 1 19:26:41 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
    *---.   ¡¨¡3c36210¡¨¡d72c16c a759c98 d7a9ecb d8c031b¡¨¡Merge branches 'branch1', 'branch2' and 'branch3'¡¨¡Fri Dec 1 19:26:40 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    |\ \ \
    | | | * ¡¨¡d8c031b¡¨¡d275fba¡¨¡branch 3¡¨¡Fri Dec 1 19:26:39 2017 +0100¡¨¡rudifa¡¨¡ (branch3)¡¨¡
    | | * | ¡¨¡d7a9ecb¡¨¡d275fba¡¨¡branch 2¡¨¡Fri Dec 1 19:26:38 2017 +0100¡¨¡rudifa¡¨¡ (branch2)¡¨¡
    | | |/
    | * | ¡¨¡a759c98¡¨¡d275fba¡¨¡branch 1¡¨¡Fri Dec 1 19:26:37 2017 +0100¡¨¡rudifa¡¨¡ (branch1)¡¨¡
    | |/
    * | ¡¨¡d72c16c¡¨¡d275fba¡¨¡commit directly on master again¡¨¡Fri Dec 1 19:26:36 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    |/
    * ¡¨¡d275fba¡¨¡3cfe6bd¡¨¡commit directly on master¡¨¡Fri Dec 1 19:26:35 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    * ¡¨¡3cfe6bd¡¨¡¡¨¡initial¡¨¡Fri Dec 1 19:26:35 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    */};
    return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}



function G_demo_col_init_error__topo() {
  function heredoc() { /*
    * ¡¨¡7a42c73¡¨¡33bd179¡¨¡commit 8 on branch bre¡¨¡Fri Nov 24 23:22:37 2017 +0100¡¨¡rudifa¡¨¡ (bre)¡¨¡
    | * ¡¨¡62039f3¡¨¡12b4472¡¨¡commit 7 on brc¡¨¡Fri Nov 24 23:09:19 2017 +0100¡¨¡rudifa¡¨¡ (brd)¡¨¡
    | | * ¡¨¡967dbb2¡¨¡12b4472¡¨¡commit 5 on master¡¨¡Fri Nov 24 23:05:01 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
    | |/
    | *   ¡¨¡12b4472¡¨¡afec16a 33bd179¡¨¡Merge branch 'refs/heads/brb'¡¨¡Fri Nov 24 23:03:26 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    | |\
    | |/
    |/|
    * | ¡¨¡33bd179¡¨¡5b59f30¡¨¡commit brb 2¡¨¡Fri Nov 24 22:58:31 2017 +0100¡¨¡rudifa¡¨¡ (brb)¡¨¡
    | * ¡¨¡afec16a¡¨¡5b59f30¡¨¡commit master 3¡¨¡Fri Nov 24 22:59:51 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    |/
    * ¡¨¡5b59f30¡¨¡e2c32ae¡¨¡master 1¡¨¡Fri Nov 24 22:55:28 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    * ¡¨¡e2c32ae¡¨¡¡¨¡initial commit¡¨¡Fri Nov 24 22:54:03 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
    */};
    return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}

function G_demo_col_init_error__date() {
  function heredoc() { /*
* ¡¨¡7a42c73¡¨¡33bd179¡¨¡commit 8 on branch bre¡¨¡Fri Nov 24 23:22:37 2017 +0100¡¨¡rudifa¡¨¡ (bre)¡¨¡
| * ¡¨¡62039f3¡¨¡12b4472¡¨¡commit 7 on brc¡¨¡Fri Nov 24 23:09:19 2017 +0100¡¨¡rudifa¡¨¡ (brd)¡¨¡
| | * ¡¨¡967dbb2¡¨¡12b4472¡¨¡commit 5 on master¡¨¡Fri Nov 24 23:05:01 2017 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
| |/
| *   ¡¨¡12b4472¡¨¡afec16a 33bd179¡¨¡Merge branch 'refs/heads/brb'¡¨¡Fri Nov 24 23:03:26 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
| |\
| |/
|/|
| * ¡¨¡afec16a¡¨¡5b59f30¡¨¡commit master 3¡¨¡Fri Nov 24 22:59:51 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
* | ¡¨¡33bd179¡¨¡5b59f30¡¨¡commit brb 2¡¨¡Fri Nov 24 22:58:31 2017 +0100¡¨¡rudifa¡¨¡ (brb)¡¨¡
|/
* ¡¨¡5b59f30¡¨¡e2c32ae¡¨¡master 1¡¨¡Fri Nov 24 22:55:28 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
* ¡¨¡e2c32ae¡¨¡¡¨¡initial commit¡¨¡Fri Nov 24 22:54:03 2017 +0100¡¨¡rudifa¡¨¡¡¨¡
*/};
return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}


function H_criss_cross__topo() {
  function heredoc() { /*
¡¨¡1e95b1e¡¨¡ee60e17¡¨¡m commit¡¨¡Wed Jan 3 12:00:28 2018 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
¡¨¡ee60e17¡¨¡f405347 8e4c7f3¡¨¡Merge branch 'refs/heads/A'¡¨¡Wed Jan 3 12:00:03 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡8e4c7f3¡¨¡a577ba0 f2d149f¡¨¡Merge branch 'refs/heads/master' into A¡¨¡Wed Jan 3 11:58:50 2018 +0100¡¨¡rudifa¡¨¡ (A)¡¨¡
¡¨¡a577ba0¡¨¡c64c45b¡¨¡a commit¡¨¡Wed Jan 3 11:57:11 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡c64c45b¡¨¡9c94f15 3376889¡¨¡Merge branch 'refs/heads/C' into A¡¨¡Wed Jan 3 11:56:48 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡9c94f15¡¨¡ba94fb4 bd181e5¡¨¡Merge branch 'refs/heads/B' into A¡¨¡Wed Jan 3 11:56:08 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡ba94fb4¡¨¡ebbcbb9¡¨¡a commit¡¨¡Wed Jan 3 11:54:50 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡f405347¡¨¡f2d149f¡¨¡m commit¡¨¡Wed Jan 3 11:59:32 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡f2d149f¡¨¡de42b32¡¨¡a commit¡¨¡Wed Jan 3 11:58:24 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡de42b32¡¨¡3376889¡¨¡m commit¡¨¡Wed Jan 3 11:53:54 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡3376889¡¨¡bd181e5¡¨¡m commit¡¨¡Wed Jan 3 11:53:13 2018 +0100¡¨¡rudifa¡¨¡ (C)¡¨¡
¡¨¡bd181e5¡¨¡ebbcbb9¡¨¡m commit¡¨¡Wed Jan 3 11:52:29 2018 +0100¡¨¡rudifa¡¨¡ (B)¡¨¡
¡¨¡ebbcbb9¡¨¡d4575d5¡¨¡m commit¡¨¡Wed Jan 3 11:49:14 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡d4575d5¡¨¡¡¨¡initial commit¡¨¡Wed Jan 3 11:48:28 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
*/};
return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}


function K_simple_branch_merge__topo() {
  function heredoc() { /*
¡¨¡33de39b¡¨¡a843eba¡¨¡m commit¡¨¡Thu Jan 4 20:56:48 2018 +0100¡¨¡rudifa¡¨¡ (HEAD -> master)¡¨¡
¡¨¡a843eba¡¨¡0d4dff8 063b4a7¡¨¡Merge branch 'A'¡¨¡Thu Jan 4 20:55:31 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡063b4a7¡¨¡0d4dff8¡¨¡a commit¡¨¡Thu Jan 4 20:54:55 2018 +0100¡¨¡rudifa¡¨¡ (A)¡¨¡
¡¨¡0d4dff8¡¨¡dcecf1e¡¨¡m commit¡¨¡Thu Jan 4 20:54:12 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
¡¨¡dcecf1e¡¨¡¡¨¡inital>¡¨¡Thu Jan 4 20:53:36 2018 +0100¡¨¡rudifa¡¨¡¡¨¡
*/};
return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
}


function SimpleJSON()  {
  function heredoc() { /*
    * ¡¨¡611748a¡¨¡07a1266¡¨¡Allow a JSONValue to be created from an int¡¨¡Wed Jul 6 09:10:02 2016 +0100¡¨¡Mike Anchor¡¨¡ (HEAD -> master, upstream/master, origin/master, origin/HEAD)¡¨¡
    *   ¡¨¡07a1266¡¨¡d5584f0 5f6f8f3¡¨¡Merge pull request #32 from EvilPudding/master¡¨¡Sat Feb 6 21:41:02 2016 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    |\
    | * ¡¨¡5f6f8f3¡¨¡7ce5b58¡¨¡Optimization.¡¨¡Fri Dec 11 17:30:40 2015 +0000¡¨¡EvilPudding¡¨¡¡¨¡
    * |   ¡¨¡d5584f0¡¨¡7ce5b58 40b75f2¡¨¡Merge pull request #30 from fokede/master¡¨¡Sat Feb 6 21:30:32 2016 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    |\ \
    | |/
    |/|
    | * ¡¨¡40b75f2¡¨¡7ce5b58¡¨¡MinGW compatibility fix¡¨¡Sun Oct 25 22:25:43 2015 +0200¡¨¡fokede¡¨¡¡¨¡
    |/
    *   ¡¨¡7ce5b58¡¨¡7682af4 36e066d¡¨¡Merge pull request #27 from Robien/master¡¨¡Sat Aug 22 18:12:24 2015 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    |\
    | * ¡¨¡36e066d¡¨¡aec1020¡¨¡remove execution right in .h file¡¨¡Mon Aug 17 10:49:52 2015 +0200¡¨¡Romain Guyard¡¨¡¡¨¡
    | * ¡¨¡aec1020¡¨¡7682af4¡¨¡remove warning in constructors¡¨¡Mon Aug 17 10:49:30 2015 +0200¡¨¡Romain Guyard¡¨¡¡¨¡
    |/
    * ¡¨¡7682af4¡¨¡3260b36¡¨¡Wrong filename in comment...¡¨¡Tue Jun 30 20:35:49 2015 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡3260b36¡¨¡f94cdfa¡¨¡Adding copy constructor for deep copying of array/object values. This closes #24¡¨¡Tue Jun 30 20:34:31 2015 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡f94cdfa¡¨¡c60d1e1¡¨¡Whitespace cleanup.¡¨¡Tue Jun 30 20:34:31 2015 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡c60d1e1¡¨¡46cf106¡¨¡Updated gitignore.¡¨¡Tue Jun 30 20:34:31 2015 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡46cf106¡¨¡aa5cd9d¡¨¡Fixing cppcheck error. This closes #26¡¨¡Mon Jun 29 19:29:28 2015 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡aa5cd9d¡¨¡339de6c¡¨¡Fixing size of text areas in Windows.¡¨¡Sun Mar 8 15:15:15 2015 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡339de6c¡¨¡3d0006b¡¨¡Added a method to return the keys present in an object.¡¨¡Sun Mar 8 14:57:14 2015 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡3d0006b¡¨¡f3a75ab¡¨¡Updated README to mention JSONArray / JSONObject.¡¨¡Sat Mar 7 21:55:28 2015 +0000¡¨¡Mike Anchor¡¨¡ (test_topic)¡¨¡
    *   ¡¨¡f3a75ab¡¨¡4756edf bcc51ee¡¨¡Merge pull request #18 from rudifa/prettyprint_opt¡¨¡Sat Mar 7 21:42:51 2015 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    |\
    | * ¡¨¡bcc51ee¡¨¡ad82167¡¨¡Added the Prettyprint extension:¡¨¡Sun Nov 3 17:33:33 2013 +0100¡¨¡Rudi Farkas¡¨¡ (tag: rudifa)¡¨¡
    * |   ¡¨¡4756edf¡¨¡47c2fe9 6f3bb62¡¨¡Merge pull request #19 from rudifa/master¡¨¡Sat Mar 7 19:53:23 2015 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    |\ \
    | * | ¡¨¡6f3bb62¡¨¡ad82167¡¨¡moved group `src`to the pbxproj root and removed the superfluous group xcode5¡¨¡Wed Nov 6 17:20:47 2013 +0100¡¨¡Rudi Farkas¡¨¡¡¨¡
    | |/
    * | ¡¨¡47c2fe9¡¨¡ad82167¡¨¡Fixing Issue #20 - Invalid Stringify for characters above ASCII 126.¡¨¡Sun Aug 24 19:08:43 2014 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    |/
    *   ¡¨¡ad82167¡¨¡7371b35 6a87cfb¡¨¡Merge pull request #16 from rudifa/add_xcode5_project¡¨¡Sat Nov 2 19:35:43 2013 -0700¡¨¡Mike Anchor¡¨¡¡¨¡
    |\
    | * ¡¨¡6a87cfb¡¨¡7371b35¡¨¡added xcode5 project - builds and runs¡¨¡Sat Nov 2 21:59:32 2013 +0100¡¨¡Rudi Farkas¡¨¡¡¨¡
    |/
    * ¡¨¡7371b35¡¨¡093740c¡¨¡Update README.md¡¨¡Thu Sep 26 13:14:25 2013 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡093740c¡¨¡62427f3¡¨¡Update README.md¡¨¡Thu Sep 26 13:09:04 2013 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡62427f3¡¨¡8be9fa4¡¨¡Rename README to README.md¡¨¡Thu Sep 26 13:07:30 2013 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    *   ¡¨¡8be9fa4¡¨¡012bad0 8575f53¡¨¡Merge pull request #13 from klokik/android¡¨¡Sat Sep 21 05:52:08 2013 -0700¡¨¡Mike Anchor¡¨¡¡¨¡
    |\
    | * ¡¨¡8575f53¡¨¡012bad0¡¨¡Fixes for android¡¨¡Sat Sep 21 10:02:48 2013 +0300¡¨¡klokik¡¨¡¡¨¡
    |/
    * ¡¨¡012bad0¡¨¡e9206e7¡¨¡Some more whitespace removal.¡¨¡Sat May 26 16:01:03 2012 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡e9206e7¡¨¡de6696f¡¨¡Some more whitespace removal.¡¨¡Sat May 26 15:58:57 2012 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡de6696f¡¨¡7e6e3d6¡¨¡Code whitespace clean up.¡¨¡Sat May 26 15:52:23 2012 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    *   ¡¨¡7e6e3d6¡¨¡d25146e 4f55ca1¡¨¡Merge pull request #10 from cloderic/master¡¨¡Sat May 26 07:40:13 2012 -0700¡¨¡Mike Anchor¡¨¡¡¨¡
    |\
    | * ¡¨¡4f55ca1¡¨¡8fb7fd0¡¨¡Adding methods to directly retrieve from a JSONValue its children¡¨¡Thu May 24 09:27:45 2012 +0200¡¨¡Clodéric Mars¡¨¡¡¨¡
    * | ¡¨¡d25146e¡¨¡8fb7fd0¡¨¡Extra precision in Stringify() for decimal numbers.¡¨¡Sat May 26 15:28:04 2012 +0100¡¨¡Mike Anchor¡¨¡¡¨¡
    |/
    * ¡¨¡8fb7fd0¡¨¡cf8aa30¡¨¡Compile fix for Lion¡¨¡Tue Feb 14 19:11:12 2012 +0000¡¨¡Mike Anchor¡¨¡¡¨¡
    * ¡¨¡cf8aa30¡¨¡fc9947a¡¨¡Massive performance increase for Mac builds - refactored wcsncasecmp()¡¨¡Thu Aug 4 22:16:26 2011 +0100¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡fc9947a¡¨¡7a688b1¡¨¡Changed wcslen() to simplejson_wcsnlen() to increase performance on large JSON strings.¡¨¡Thu Aug 4 22:15:11 2011 +0100¡¨¡Mike¡¨¡¡¨¡
    *   ¡¨¡7a688b1¡¨¡01ae10c 99c51f3¡¨¡Merge pull request #4 from quaker66/master.¡¨¡Mon May 2 13:06:04 2011 -0700¡¨¡Mike¡¨¡¡¨¡
    |\
    | * ¡¨¡99c51f3¡¨¡dc920e9¡¨¡MinGW fix.¡¨¡Mon May 2 21:58:29 2011 +0200¡¨¡q66¡¨¡¡¨¡
    * | ¡¨¡01ae10c¡¨¡dc920e9¡¨¡Removed unnecessary str_length code - thanks to tthmok¡¨¡Wed Apr 20 23:09:09 2011 +0100¡¨¡Mike¡¨¡¡¨¡
    |/
    * ¡¨¡dc920e9¡¨¡8303710¡¨¡MinGW / cygwin compile fix.¡¨¡Wed Apr 20 18:23:45 2011 +0200¡¨¡q66¡¨¡¡¨¡
    * ¡¨¡8303710¡¨¡849c2a3¡¨¡Change caption for JSONDemo window¡¨¡Sat Mar 19 14:16:51 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡849c2a3¡¨¡7a4b114¡¨¡Fix compile error in Windows¡¨¡Sat Mar 19 10:40:35 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡7a4b114¡¨¡448dba2¡¨¡Return values that are objects by const reference.¡¨¡Fri Mar 11 07:21:49 2011 +0000¡¨¡Scott Banachowski¡¨¡¡¨¡
    * ¡¨¡448dba2¡¨¡e68cfc1¡¨¡Mark functions as const where appropriate, and change pass-by-value to pass-by-const-reference.¡¨¡Fri Mar 11 07:21:49 2011 +0000¡¨¡Scott Banachowski¡¨¡¡¨¡
    * ¡¨¡e68cfc1¡¨¡63d17ad¡¨¡Fix the number parsing on decimals less than 0.1 - thanks to Javier Abadia¡¨¡Wed Feb 16 21:42:05 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡63d17ad¡¨¡1f30ac8¡¨¡Added ParseDecimal()¡¨¡Wed Feb 16 21:41:13 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡1f30ac8¡¨¡bf972de¡¨¡Added ParseDecimal() and a doc fix on ParseInt()¡¨¡Wed Feb 16 21:41:06 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡bf972de¡¨¡e739d90¡¨¡Added another test case for a precise decimal number¡¨¡Wed Feb 16 21:40:25 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡e739d90¡¨¡c2af3cc¡¨¡Makefile fix to create obj directories when compiling fresh¡¨¡Tue Feb 15 07:22:28 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡c2af3cc¡¨¡3200623¡¨¡Added a test case for very precise decimal number¡¨¡Mon Feb 14 22:16:13 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡3200623¡¨¡baead82¡¨¡Fixes for handling very precise decimal numbers¡¨¡Mon Feb 14 22:15:43 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡baead82¡¨¡e8a9e45¡¨¡License changed to MIT & added permalink¡¨¡Sat Feb 5 22:27:41 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡e8a9e45¡¨¡55959d9¡¨¡Missing newline at end of file¡¨¡Sat Feb 5 22:26:10 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡55959d9¡¨¡45febde¡¨¡License changed to MIT¡¨¡Sat Feb 5 22:25:12 2011 +0000¡¨¡Mike¡¨¡¡¨¡
    * ¡¨¡45febde¡¨¡3e083a3¡¨¡Mac compile fixes¡¨¡Wed Sep 22 22:18:58 2010 +0100¡¨¡MJPA¡¨¡¡¨¡
    * ¡¨¡3e083a3¡¨¡dc4807e¡¨¡Linux compile fix¡¨¡Wed Sep 22 22:16:28 2010 +0100¡¨¡MJPA¡¨¡¡¨¡
    * ¡¨¡dc4807e¡¨¡baab08b¡¨¡Adding first commit with files¡¨¡Wed Sep 22 21:13:02 2010 +0100¡¨¡MJPA¡¨¡¡¨¡
    * ¡¨¡baab08b¡¨¡a1c581b¡¨¡Initial commit of files.¡¨¡Wed Sep 22 20:50:04 2010 +0100¡¨¡MJPA¡¨¡¡¨¡
    * ¡¨¡a1c581b¡¨¡¡¨¡Initial commit¡¨¡Tue Sep 21 19:25:23 2010 +0100¡¨¡MJPA¡¨¡¡¨¡
          */};
          return heredoc.toString().replace(/'/g,"").split('\n').slice(1,-1).map(function(s) {return s.trim()});
  }
