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
  if(typeof(Services) === "undefined") {
    Components.utils.import("resource://gre/modules/Services.jsm");
  }
  function generateError() {
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
  function getTestPrefsStr(prefix) {
    var str = "Current state of test prefs:\n\n";
    testPrefs.forEach(function(prefName) {
      str += prefName + " : " + getPref(prefName) + "\n";
    });
    return(str + "\n");
  }
  function confirmEx(title, msg, button0Title, button1Title, button2Title) {
    // button1 should be the safe cancel/donothing option
    var promptSvc = Services.prompt;
    var buttonFlags = (promptSvc.BUTTON_POS_1 * promptSvc.BUTTON_TITLE_IS_STRING) +
                       promptSvc.BUTTON_POS_1_DEFAULT;
    if(button0Title != null) {
      buttonFlags += (promptSvc.BUTTON_POS_0 * promptSvc.BUTTON_TITLE_IS_STRING);
    }
    if(button2Title !== null) {
      buttonFlags += (promptSvc.BUTTON_POS_2 * promptSvc.BUTTON_TITLE_IS_STRING);
    }
    return(promptSvc.confirmEx(null, title, msg, buttonFlags, button0Title, button1Title, button2Title, null, {}));
  }
  setMilestone("2");
  var greeting = "Hello " + (getenv("USERNAME") || getenv("USER") || "Human") + "!\n\n";
  var msg = greeting + getTestPrefsStr();
  var buttonPressed = confirmEx(cfgFile, msg, "Test error handling", "Next", "Set testcfg prefs");
  if(buttonPressed === 0) {
    generateError();
    msg = "You shouldn't see this";
  }
  else if(buttonPressed === 1) {
    msg = "What would you like to do now?";
  }
  else if(buttonPressed === 2) {
    pref("__testcfg-setwith-pref", "FOUND");
    defaultPref("__testcfg-setwith-defaultPref", "FOUND");
    lockPref("__testcfg-setwith-lockPref", "FOUND");
    msg = "The testcfg prefs were set.\n\n" + getTestPrefsStr();
  }
  setMilestone("3");
  buttonPressed = confirmEx(cfgFile, msg, "Clear all test prefs", "Next", null);
  msg = "";
  if(buttonPressed === 0) {
    testPrefs.forEach(function(prefName) {
      clearPref(prefName);
    });
    msg = "All test prefs were cleared.\n\n";
  }
  setMilestone("4");
  msg += getTestPrefsStr();
  Services.prompt.alert(null, cfgFile, msg);
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
