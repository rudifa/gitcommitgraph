// define(function () {

        var lines = function() { /*
          * |=;611748a|=;07a1266|=; (HEAD -> refs/heads/master, refs/remotes/origin/master, refs/remotes/origin/HEAD)|=;Allow a JSONValue to be created from an int|=;2016-07-06|=;Mike Anchor|=;
          *   |=;07a1266|=;d5584f0 5f6f8f3|=;|=;Merge pull request #32 from EvilPudding/master|=;2016-02-06|=;Mike Anchor|=;
          |\
          | * |=;5f6f8f3|=;7ce5b58|=;|=;Optimization.|=;2015-12-11|=;EvilPudding|=;
          * |   |=;d5584f0|=;7ce5b58 40b75f2|=;|=;Merge pull request #30 from fokede/master|=;2016-02-06|=;Mike Anchor|=;
          |\ \
          | |/
          |/|
          | * |=;40b75f2|=;7ce5b58|=;|=;MinGW compatibility fix|=;2015-10-25|=;fokede|=;
          |/
          *   |=;7ce5b58|=;7682af4 36e066d|=;|=;Merge pull request #27 from Robien/master|=;2015-08-22|=;Mike Anchor|=;
          |\
          | * |=;36e066d|=;aec1020|=;|=;remove execution right in .h file|=;2015-08-17|=;Romain Guyard|=;
          | * |=;aec1020|=;7682af4|=;|=;remove warning in constructors|=;2015-08-17|=;Romain Guyard|=;
          |/
          * |=;7682af4|=;3260b36|=;|=;Wrong filename in comment...|=;2015-06-30|=;Mike Anchor|=;
          * |=;3260b36|=;f94cdfa|=;|=;Adding copy constructor for deep copying of array/object values. This closes #24|=;2015-06-30|=;Mike Anchor|=;
          * |=;f94cdfa|=;c60d1e1|=;|=;Whitespace cleanup.|=;2015-06-30|=;Mike Anchor|=;
          * |=;c60d1e1|=;46cf106|=;|=;Updated gitignore.|=;2015-06-30|=;Mike Anchor|=;
          * |=;46cf106|=;aa5cd9d|=;|=;Fixing cppcheck error. This closes #26|=;2015-06-29|=;Mike Anchor|=;
          * |=;aa5cd9d|=;339de6c|=;|=;Fixing size of text areas in Windows.|=;2015-03-08|=;Mike Anchor|=;
          * |=;339de6c|=;3d0006b|=;|=;Added a method to return the keys present in an object.|=;2015-03-08|=;Mike Anchor|=;
          * |=;3d0006b|=;f3a75ab|=; (refs/heads/test_topic)|=;Updated README to mention JSONArray / JSONObject.|=;2015-03-07|=;Mike Anchor|=;
          *   |=;f3a75ab|=;4756edf bcc51ee|=;|=;Merge pull request #18 from rudifa/prettyprint_opt|=;2015-03-07|=;Mike Anchor|=;
          |\
          | * |=;bcc51ee|=;ad82167|=; (tag: refs/tags/rudifa)|=;Added the Prettyprint extension:|=;2013-11-03|=;Rudi Farkas|=;
          * |   |=;4756edf|=;47c2fe9 6f3bb62|=;|=;Merge pull request #19 from rudifa/master|=;2015-03-07|=;Mike Anchor|=;
          |\ \
          | * | |=;6f3bb62|=;ad82167|=;|=;moved group `src`to the pbxproj root and removed the superfluous group xcode5|=;2013-11-06|=;Rudi Farkas|=;
          | |/
          * | |=;47c2fe9|=;ad82167|=;|=;Fixing Issue #20 - Invalid Stringify for characters above ASCII 126.|=;2014-08-24|=;Mike Anchor|=;
          |/
          *   |=;ad82167|=;7371b35 6a87cfb|=;|=;Merge pull request #16 from rudifa/add_xcode5_project|=;2013-11-02|=;Mike Anchor|=;
          |\
          | * |=;6a87cfb|=;7371b35|=;|=;added xcode5 project - builds and runs|=;2013-11-02|=;Rudi Farkas|=;
          |/
          * |=;7371b35|=;093740c|=;|=;Update README.md|=;2013-09-26|=;Mike Anchor|=;
          * |=;093740c|=;62427f3|=;|=;Update README.md|=;2013-09-26|=;Mike Anchor|=;
          * |=;62427f3|=;8be9fa4|=;|=;Rename README to README.md|=;2013-09-26|=;Mike Anchor|=;
          *   |=;8be9fa4|=;012bad0 8575f53|=;|=;Merge pull request #13 from klokik/android|=;2013-09-21|=;Mike Anchor|=;
          |\
          | * |=;8575f53|=;012bad0|=;|=;Fixes for android|=;2013-09-21|=;klokik|=;
          |/
          * |=;012bad0|=;e9206e7|=;|=;Some more whitespace removal.|=;2012-05-26|=;Mike Anchor|=;
          * |=;e9206e7|=;de6696f|=;|=;Some more whitespace removal.|=;2012-05-26|=;Mike Anchor|=;
          * |=;de6696f|=;7e6e3d6|=;|=;Code whitespace clean up.|=;2012-05-26|=;Mike Anchor|=;
          *   |=;7e6e3d6|=;d25146e 4f55ca1|=;|=;Merge pull request #10 from cloderic/master|=;2012-05-26|=;Mike Anchor|=;
          |\
          | * |=;4f55ca1|=;8fb7fd0|=;|=;Adding methods to directly retrieve from a JSONValue its children|=;2012-05-24|=;Clodéric Mars|=;
          * | |=;d25146e|=;8fb7fd0|=;|=;Extra precision in Stringify() for decimal numbers.|=;2012-05-26|=;Mike Anchor|=;
          |/
          * |=;8fb7fd0|=;cf8aa30|=;|=;Compile fix for Lion|=;2012-02-14|=;Mike Anchor|=;
          * |=;cf8aa30|=;fc9947a|=;|=;Massive performance increase for Mac builds - refactored wcsncasecmp()|=;2011-08-04|=;Mike|=;
          * |=;fc9947a|=;7a688b1|=;|=;Changed wcslen() to simplejson_wcsnlen() to increase performance on large JSON strings.|=;2011-08-04|=;Mike|=;
          *   |=;7a688b1|=;01ae10c 99c51f3|=;|=;Merge pull request #4 from quaker66/master.|=;2011-05-02|=;Mike|=;
          |\
          | * |=;99c51f3|=;dc920e9|=;|=;MinGW fix.|=;2011-05-02|=;q66|=;
          * | |=;01ae10c|=;dc920e9|=;|=;Removed unnecessary str_length code - thanks to tthmok|=;2011-04-20|=;Mike|=;
          |/
          * |=;dc920e9|=;8303710|=;|=;MinGW / cygwin compile fix.|=;2011-04-20|=;q66|=;
          * |=;8303710|=;849c2a3|=;|=;Change caption for JSONDemo window|=;2011-03-19|=;Mike|=;
          * |=;849c2a3|=;7a4b114|=;|=;Fix compile error in Windows|=;2011-03-19|=;Mike|=;
          * |=;7a4b114|=;448dba2|=;|=;Return values that are objects by const reference.|=;2011-03-11|=;Scott Banachowski|=;
          * |=;448dba2|=;e68cfc1|=;|=;Mark functions as const where appropriate, and change pass-by-value to pass-by-const-reference.|=;2011-03-11|=;Scott Banachowski|=;
          * |=;e68cfc1|=;63d17ad|=;|=;Fix the number parsing on decimals less than 0.1 - thanks to Javier Abadia|=;2011-02-16|=;Mike|=;
          * |=;63d17ad|=;1f30ac8|=;|=;Added ParseDecimal()|=;2011-02-16|=;Mike|=;
          * |=;1f30ac8|=;bf972de|=;|=;Added ParseDecimal() and a doc fix on ParseInt()|=;2011-02-16|=;Mike|=;
          * |=;bf972de|=;e739d90|=;|=;Added another test case for a precise decimal number|=;2011-02-16|=;Mike|=;
          * |=;e739d90|=;c2af3cc|=;|=;Makefile fix to create obj directories when compiling fresh|=;2011-02-15|=;Mike|=;
          * |=;c2af3cc|=;3200623|=;|=;Added a test case for very precise decimal number|=;2011-02-14|=;Mike|=;
          * |=;3200623|=;baead82|=;|=;Fixes for handling very precise decimal numbers|=;2011-02-14|=;Mike|=;
          * |=;baead82|=;e8a9e45|=;|=;License changed to MIT & added permalink|=;2011-02-05|=;Mike|=;
          * |=;e8a9e45|=;55959d9|=;|=;Missing newline at end of file|=;2011-02-05|=;Mike|=;
          * |=;55959d9|=;45febde|=;|=;License changed to MIT|=;2011-02-05|=;Mike|=;
          * |=;45febde|=;3e083a3|=;|=;Mac compile fixes|=;2010-09-22|=;MJPA|=;
          * |=;3e083a3|=;dc4807e|=;|=;Linux compile fix|=;2010-09-22|=;MJPA|=;
          * |=;dc4807e|=;baab08b|=;|=;Adding first commit with files|=;2010-09-22|=;MJPA|=;
          * |=;baab08b|=;a1c581b|=;|=;Initial commit of files.|=;2010-09-22|=;MJPA|=;
          * |=;a1c581b|=;|=;|=;Initial commit|=;2010-09-21|=;MJPA|=;
          */ }.toString().split('\n').slice(1,-1).map(function(s) {
           return s.trim()
         });

     //console.log(get_git_log_out)

// return {
//
//     lines: lines
//
//     };
// });
module.exports = { lines: lines };
