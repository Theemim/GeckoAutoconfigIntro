user_pref("__userjsMilestone", "1");

// Test non-existent function call
//thisFunctionDoesNotExist();

// Too few arguments
//user_pref("__userjs-error1");

// Setting an int pref to a string
//user_pref("__userjs-error2", 1);
//user_pref("__userjs-error2", "this-should-not-be-set");

// Missing semicolon
//user_pref("__userjs-error3", "this-should-not-be-set")

// Missing closing quote
//user_pref("__userjs-error4, "this-should-not-be-set");

// Extra paren
//user_pref("__userjs-error5", "this-should-not-be-set"));

// Unmatched closing brace
// }

user_pref("__userjsMilestone", "2");

user_pref("__userjs-setwith-user_pref", "Set by user.js");
pref("__userjs-setwith-pref", "Set by user.js");
sticky_pref("__userjs-setwith-sticky_pref", "Set by user.js");

user_pref("__userjsMilestone", "3 (Done)");

