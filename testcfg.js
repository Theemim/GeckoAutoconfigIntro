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
  function createErrorCondition() {
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
  function getTestPrefsStr() {
    var str = "Current state of test prefs:\n\n";
    testPrefs.forEach(function(prefName) {
      str += prefName + " : " + getPref(prefName) + "\n";
    });
    return(str + "\n");
  }
  function buttonPrompt(title, msg, button0Title, button1Title, button2Title) {
    // Due to bug 345067, this will always return 1 if the user closes the window
    // using the close button in the titlebar.  Behavior of this function: button1
    // is non-optional, it will always be the default, if it is clicked or a close
    // happens then the return code will be 1.  A return code of 1 should be a safe
    // "do nothing" choice.  Other buttons are optional.  If only two buttons are
    // needed use button0 and button1.  Button positions may be platform dependent.
    // https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIPromptService#confirmEx()
    // https://bugzilla.mozilla.org/show_bug.cgi?id=345067
    if(!button1Title) {
      throw(new Error("button1 is not optional"));
    }
    if(!button0Title && button2Title) {
      throw(new Error("For two button prompts use button0 and button1"));
    }
    var buttonFlags;
    var promptSvc = Services.prompt;
    if(!button0Title && !button2Title) {
       // Adjustment due to button1 handling
      button0Title = button1Title;
      button1Title = null;
      buttonFlags = (promptSvc.BUTTON_POS_0 * promptSvc.BUTTON_TITLE_IS_STRING) +
                     promptSvc.BUTTON_POS_0_DEFAULT;
    }
    else {
      buttonFlags = (promptSvc.BUTTON_POS_1 * promptSvc.BUTTON_TITLE_IS_STRING) +
                     promptSvc.BUTTON_POS_1_DEFAULT;
      if(button0Title) {
        buttonFlags += (promptSvc.BUTTON_POS_0 * promptSvc.BUTTON_TITLE_IS_STRING);
      }
      if(button2Title) {
        buttonFlags += (promptSvc.BUTTON_POS_2 * promptSvc.BUTTON_TITLE_IS_STRING);
      }
    }
    var result = promptSvc.confirmEx(null, title, msg, buttonFlags, button0Title, button1Title, button2Title, null, {});
    if((!button1Title && !button2Title) && (result === 0)) {
       // Adjustment due to button1 handling
       result = 1;
    }
    return(result);
  }
  function getDialogMsg(leader, trailer) {
    if(leader) {
      leader += "\n\n";
    }
    return(leader + getTestPrefsStr() + trailer + "\n\n");
  }
  setMilestone("2");

  var leader = "Hello " + (getenv("USERNAME") || getenv("USER") || "Human") + "!";
  var msg = getDialogMsg(leader, "Would you like to create an error condition?");
  var buttonPressed = buttonPrompt(cfgFile, msg, "Create error", "Skip", null);
  if(buttonPressed === 0) {
    createErrorCondition();
    leader = "An error condition was created, so you should not see this";
  }
  else leader = "";
  setMilestone("3");

  msg = getDialogMsg(leader, "Would you like to set testcfg prefs?");
  buttonPressed = buttonPrompt(cfgFile, msg, "Set testcfg prefs", "Skip", null);
  if(buttonPressed === 0) {
    pref("__testcfg-setwith-pref", "Set by testcfg.js");
    defaultPref("__testcfg-setwith-defaultPref", "Set by testcfg.js");
    lockPref("__testcfg-setwith-lockPref", "Set by testcfg.js");
    leader = "The testcfg prefs were set.";
  }
  else leader = "";
  setMilestone("3");

  msg = getDialogMsg(leader, "Would you like to set userjs prefs?");
  buttonPressed = buttonPrompt(cfgFile, msg, "Set userjs prefs", "Skip", null);
  if(buttonPressed === 0) {
    msg = getDialogMsg("", "Which function do you want to use to set userjs prefs?");
    buttonPressed = buttonPrompt(cfgFile, msg, "pref()", "lockPref()", "defaultPref()");
    var prefSetFunc;
    var prefValue;
    if(buttonPressed === 0) {
      prefSetFunc = pref;
      prefValue = "Set by testcfg.js with pref";
    }
    else if(buttonPressed === 1) {
      prefSetFunc = lockPref;
      prefValue = "Set by testcfg.js with lockPref";
    }
    else  {
      prefSetFunc = defaultPref;
      prefValue = "Set by testcfg.js with defaultPref";
    }
    prefSetFunc("__userjs-setwith-user_pref", prefValue);
    prefSetFunc("__userjs-setwith-pref", prefValue);
    prefSetFunc("__userjs-setwith-sticky_pref", prefValue);
    leader = "The testcfg prefs were set.";
  }
  setMilestone("4");

  msg = getDialogMsg(leader, "Would you like to clear all test prefs?");
  buttonPressed = buttonPrompt(cfgFile, msg, "Clear all test prefs", "Skip", null);
  if(buttonPressed === 0) {
    testPrefs.forEach(function(prefName) {
      clearPref(prefName);
    });
    leader = "All test prefs were cleared.";
  }
  else leader = "";
  setMilestone("5");

  msg = getDialogMsg(leader, "Nothing more to do.");
  buttonPrompt(cfgFile, msg, null, "OK", null);

  var consoleSvc = Components.classes["@mozilla.org/consoleservice;1"]
                             .getService(Components.interfaces.nsIConsoleService);
  consoleSvc.logStringMessage(cfgFile + " was here");
  setMilestone("6 (Done)");
}
catch(e) {
  displayError(cfgFile, "\n\n " + e.toString() + "\n Stack: " + e.stack +
               "\n Last milestone: " + milestone + "\n");
  throw("");
}
