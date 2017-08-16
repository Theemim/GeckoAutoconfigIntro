user_pref("__userjsMilestone", "1");

// Test non-existent function call
//thisFunctionDoesNotExist();

// Too few arguments
//user_pref("__userjs-error1");

// Setting an int pref to a string
//user_pref("__userjs-error2", 1);
//user_pref("__userjs-error2", "FOUND");

// Missing semicolon
//user_pref("__userjs-error3", "FOUND")

// Missing closing quote
//user_pref("__userjs-error4, "FOUND");

// Extra paren
//user_pref("__userjs-error5", "FOUND"));

// Unmatched closing brace
// }

user_pref("__userjsMilestone", "2");

user_pref("__userjs-setwith-user_pref", "FOUND");
pref("__userjs-setwith-pref", "FOUND");
sticky_pref("__userjs-setwith-sticky_pref", "FOUND");

user_pref("__userjsMilestone", "3 (Done)");

