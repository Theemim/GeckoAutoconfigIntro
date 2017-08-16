// First line is ignored.  Leave a single line comment here.

"use strict";

var milestone = "0";
var cfgFile = "Autoconfig";
try {
  cfgFile = getPref("general.config.filename");
  function setMilestone(str) {
    milestone = str;
    lockPref("__testcfgMilestone", str);
  }
  setMilestone("1");

  var username = getenv("USERNAME") || getenv("USER") || "Human";
  if(typeof(Services) === "undefined") {
    Components.utils.import("resource://gre/modules/Services.jsm");
  }
  var msg = "Hello " + username + ".  I looked for test prefs:\n\n";
  var testPrefs = [
    "__testcfg-error1",
    "__testcfg-error2",
    "__testcfg-error3",
    "__testcfg-error4",
    "__testcfg-error5",
    "__testcfg-setwith-pref",
    "__testcfg-setwith-defaultPref",
    "__testcfg-setwith-lockPref",
    "__userjs-error1",
    "__userjs-error2",
    "__userjs-error3",
    "__userjs-error4",
    "__userjs-error5",
    "__userjs-setwith-user_pref",
    "__userjs-setwith-pref",
    "__userjs-setwith-sticky_pref",
  ];
  testPrefs.forEach(function(prefName) {
    msg += prefName + " : " + getPref(prefName) + "\n";
  });
  msg += "\nWould you like to perform error handling tests?\n";
  if(Services.prompt.confirm(null, cfgFile, msg) === true) {

    // Throw of new Error
    throw(new Error("This is a throw of a new Error"));

    // Throw of string
    //throw("This is a throw of a string");

    // Test non-existent function call
    //thisFunctionDoesNotExist();

    // Too few arguments
    //lockPref("__testcfg-error1");

    // Setting an int pref to a string
    //lockPref("__testcfg-error2", 1);
    //lockPref("__testcfg-error2", "FOUND");

    // Missing semicolon
    //lockPref("__testcfg-error3", "FOUND")

    // Missing closing quote
    //lockPref("__testcfg-error4, "FOUND");

    // Extra paren
    //lockPref("__testcfg-error5", "FOUND"));

    // Unmatched closing brace
    // }

  }
  setMilestone("2");

  msg = "Would you like to perform pref set tests?\n";
  var doPrefSetTests = Services.prompt.confirm(null, cfgFile, msg);
  if(doPrefSetTests) {
    pref("__testcfg-setwith-pref", "FOUND");
    defaultPref("__testcfg-setwith-defaultPref", "FOUND");
    lockPref("__testcfg-setwith-lockPref", "FOUND");
    msg = "I looked for test prefs again:\n\n";
    testPrefs.forEach(function(prefName) {
      msg += prefName + " : " + getPref(prefName) + "\n";
    });
    msg += "\n"
  }
  else msg = "";
  setMilestone("3");

  msg += "Would you like to clear all test prefs?\n";
  if(Services.prompt.confirm(null, cfgFile, msg) === true) {
    testPrefs.forEach(function(prefName) {
      clearPref(prefName);
    });
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
