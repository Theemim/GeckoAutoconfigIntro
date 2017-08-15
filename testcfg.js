// First line is ignore.  Leave a single line comment here.

var milestone = "0";
var cfgFile = "Autoconfig";
try {
  cfgFile = getPref("general.config.filename");
  function setMilestone(str) {
    milestone = str;
    lockPref("_autoconfigMilestone", str);
  }
  setMilestone("1");

  var username = getenv("USERNAME") || getenv("USER") || "Human";
  if(typeof(Services) === "undefined") {
    Components.utils.import("resource://gre/modules/Services.jsm");
  }
  var msg = username + ": Would you like to perform error handling tests?";
  if(Services.prompt.confirm(null, cfgFile, msg) === true) {

    // Throw of new Error
    throw(new Error("This is a throw of a new Error"));

    // Throw of string
    //throw("This is a throw of a string");

    // Test non-existent function call
    //var foo = thisFunctionDoesNotExist();

    // Too few arguments
    //pref("_testcfg-error1");

    // Setting an int pref to a string
    //lockPref("_testcfg-error2", 1);
    //lockPref("_testcfg-error2", "whoops");

    // Missing semicolon
    //lockPref("_testcfg-error3", "Is this set?")

    // Extra paren
    //throw("This is a throw"));

    // Unmatched closing brace
    // }

  }
  setMilestone("2");

  msg = username + ": Would you like to perform pref set tests?";
  if(Services.prompt.confirm(null, cfgFile, msg) === true) {
    pref("_testcfg-pref1", "pref1: set with pref()");
    defaultPref("_testcfg-pref2", "pref2: set with defaultPref()");
    lockPref("_testcfg-pref3", "pref3: set with lockPref()");
  }
  setMilestone("3");

  msg = username + ": Would you like to perform pref clear tests?";
  if(Services.prompt.confirm(null, cfgFile, msg) === true) {
    clearPref("_testcfg-pref1");
    clearPref("_testcfg-pref2");
    clearPref("_testcfg-pref3");
  }
  setMilestone("4");

  var consoleSvc = Components.classes["@mozilla.org/consoleservice;1"]
                             .getService(Components.interfaces.nsIConsoleService);
  consoleSvc.logStringMessage(cfgFile + " was here");
  setMilestone("5 (Done)");
}
catch(e) {
  displayError(cfgFile, "\n\n " + e.toString() + "\n Stack: " + e.stack +
               "\n Last milestone: " + milestone + "\n");
  throw("");
}
