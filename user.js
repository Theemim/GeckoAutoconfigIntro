user_pref("__userjsMilestone", "1");

// Test non-existent function call
//thisFunctionDoesNotExist();

// Too few arguments
//user_pref("__userjs-error1");

// Setting an int pref to a string
//lockPref("__userjs-error2", 1);
//lockPref("__userjs-error2", "FOUND");

// Missing semicolon
//lockPref("__userjs-error3", "FOUND")

// Missing closing quote
//lockPref("__userjs-error4, "FOUND");

// Extra paren
//lockPref("__userjs-error5", "FOUND"));

// Unmatched closing brace
// }

user_pref("__userjsMilestone", "2");

pref("__userjs-setwith-user_pref", "FOUND");
pref("__userjs-setwith-pref", "FOUND");
pref("__userjs-setwith-sticky_pref", "FOUND");

user_pref("__userjsMilestone", "3 (Done)");

