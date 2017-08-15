### Autoconfig

Autoconfig is a mechanism that can be used to configure Firefox, Thunderbird, SeaMonkey, and other Gecko-based applications.  An autoconfig file is a Javascript file that can modify preferences (application settings) through function calls, and perform other operations, during program startup.  It is somewhat similar to the better known user.js file, but there are important differences between the two:

|Characteristic|autoconfig|user.js|
|:-------------|:---------|:------|
|File location:|Program directory|Profile|
|Typical file permissions:|Admin or elevated|User|
|Can affect:|All profiles|The profile where it resides|
|Function interface:| * getPrefBranch()<br />* pref(prefName, value)<br />* defaultPref(prefName, value)<br />* lockPref(prefName, value)<br />* lockPref(prefName)<br /> * getPref(prefName)<br />* clearPref(prefName)<br />* setLDAPVersion(version)<br />* getLDAPAttributes(host, base, filter, attribs, isSecure)<br />* getLDAPValue(str, key)<br />* displayError(funcname, message)<br />* getenv(name)|* user_pref(prefName, value)<br />* pref(prefName, value)<br />* sticky_pref(prefName, value)|
|Javascript:|Fully available including variables, custom functions, etc|Only comments and the above function calls are permitted|
|Error handling:|Exceptions can be caught and reported|Processing is silently aborted|
|Can use other browser APIs via XPCOM:|Yes|No|
|Can override or prevent user modifications:|Yes|No|

Most pages about autoconfig were created in the past and have not been kept up to date.  It is not unusual to see references to preferences and/or other things which are no longer applicable.  However, the basic characteristics of autoconfig (such as the function call interface it uses) have been pretty stable.  So even the oldest articles continue to have some relevancy.  I think Mike Kaply's articles provide enough information to get started.

#### Mike Kaply Articles
* [Firefox Autoconfig Files](https://mike.kaply.com/2012/03/16/customizing-firefox-autoconfig-files)
* [Firefox Autoconfig Files Continued](https://mike.kaply.com/2012/03/20/customizing-firefox-autoconfig-files-continued/)
* [Advanced Autoconfig Files](https://mike.kaply.com/2012/03/22/customizing-firefox-advanced-autoconfig-files/)
* [Firefox Autoconfig Problems](https://mike.kaply.com/2016/09/08/debugging-firefox-autoconfig-problems/)

#### Mozilla Source Code
* [/extensions/pref/autoconfig](https://dxr.mozilla.org/mozilla-central/source/extensions/pref/autoconfig/)
* [/modules/libpref](https://dxr.mozilla.org/mozilla-central/source/modules/libpref/)

#### Mozilla Autoconfig Related
* [Mission Control Desktop AKA AutoConfig](https://developer.mozilla.org/docs/MCD,_Mission_Control_Desktop_AKA_AutoConfig)
* [A brief guide to Mozilla preferences](https://developer.mozilla.org/docs/Mozilla/Preferences/A_brief_guide_to_Mozilla_preferences)
* [Deploying Firefox in an Enterprise Environment](https://developer.mozilla.org/Firefox/Enterprise_deployment)
* [Deploying Thunderbird in the Enterprise](https://developer.mozilla.org/docs/Mozilla/Thunderbird/Deploying_Thunderbird_in_the_Enterprise)

#### Dean Brundage Articles
* [An Introduction To Mission Control Desktop](http://blog.deanandadie.net/2010/04/an-introduction-to-mission-control-desktop/)
* [Setting User Preferences with Mission Control Desktop](http://blog.deanandadie.net/2010/04/setting-user-preferences-with-mission-control-desktop/)
* [LDAP Queries in Mission Control Desktop](http://blog.deanandadie.net/2010/04/ldap-queries-in-mission-control-desktop/)
* [Mapping Firefox & Thunderbird Behaviors to Preference Settings](http://blog.deanandadie.net/2010/04/mapping-firefox-thunderbird-behaviors-to-preference-settings/)
* [Reading Local Files With Javascript](http://blog.deanandadie.net/2010/05/reading-local-files-with-javascript/)
* [Manufacturing User Preferences For MCD](http://blog.deanandadie.net/2010/05/manufacturing-user-preferences-for-mcd/)
* [Easy Thunderbird Account Management Using MCD](http://blog.deanandadie.net/2010/06/easy-thunderbird-account-management-using-mcd/)

#### Other Autoconfig Links
* [http://web.mit.edu/~firefox/www/maintainers/autoconfig.html](http://web.mit.edu/~firefox/www/maintainers/autoconfig.html)
* [http://pascal-mietlicki.fr/en/blog/post/work/firefox-autoconfig/](http://pascal-mietlicki.fr/en/blog/post/work/firefox-autoconfig/)
* [http://kb.mozillazine.org/Configuration_utilities_for_administrators](http://kb.mozillazine.org/Configuration_utilities_for_administrators)
* [http://kb.mozillazine.org/Locking_preferences](http://kb.mozillazine.org/Locking_preferences)

#### User.js Overviews
* [https://github.com/ghacksuserjs/ghacks-user.js/wiki/1.1-Overview](https://github.com/ghacksuserjs/ghacks-user.js/wiki/1.1-Overview)
* [http://kb.mozillazine.org/User.js_file](http://kb.mozillazine.org/User.js_file)

#### User.js Examples
* https://github.com/ghacksuserjs/ghacks-user.js
* https://github.com/pyllyukko/user.js/
* https://github.com/atomGit/Firefox-user.js

#### Mozilla XPCOM Related
* https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM
* https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface

