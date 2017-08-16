### Autoconfig

Autoconfig is a mechanism that can be used to configure Firefox, Thunderbird, SeaMonkey, and other Gecko-based applications.  An autoconfig file is a Javascript file that can modify preferences (application settings) through function calls, and perform other operations, during program startup.  It is somewhat similar to the better known user.js file, but there are important differences between the two:

|Characteristic|autoconfig|user.js|
|:-------------|:---------|:------|
|File location:|Program directory|Profile|
|File modification:|Typically requires admin/elevated credentials|Typically requires user credentials|
|Can affect:|All profiles|The profile where it resides|
|Function API:| * getPrefBranch()<br />* pref(prefName, value)<br />* defaultPref(prefName, value)<br />* lockPref(prefName, value)<br />* lockPref(prefName)<br /> * getPref(prefName)<br />* clearPref(prefName)<br />* setLDAPVersion(version)<br />* getLDAPAttributes(host, base, filter, attribs, isSecure)<br />* getLDAPValue(str, key)<br />* displayError(funcname, message)<br />* getenv(name)|* user_pref(prefName, value)<br />* pref(prefName, value)<br />* sticky_pref(prefName, value)|
|Javascript:|Most language features supported|Specialized parser, only the above function calls are processed|
|Error handling:|Exceptions, error dialogs, custom logging possibilities|Typically silent aborting of file processing|
|Can use other browser APIs via XPCOM<sup id="a1">[1](#f1)</sup>:|Yes|No|
|Can be interactive:|Yes|No|
|Can override and restrict user modifications:|Yes|No|
|Geared toward:|Organizations, admin, users who want its additional capabilities|Those wanting simpler, inherently per-profile, pref setting capabilities|

Due to the differences in function calls and other aspects, an autoconfig file and user.js are not interchangeable.  Nor are they mutually exclusive.  Both can be used at the same time.  It is worth noting that they can perform similar preference modifications, and converting those calls may only involve changing the name of the function used.  So someone prefering autoconfig may leverage user.js examples, and vice versa.

Most pages about autoconfig were created in the past and have not been kept up to date.  Many examples refer to preferences and/or other things which are no longer applicable.  However, the basic characteristics of autoconfig (such as the function call interface it uses) have been pretty stable.  So even the oldest articles continue to have some relevancy.  I think Mike Kaply's articles provide enough information to get started.  However, I'll provide the links I am aware of and include some on user.js.  It may be beneficial to experiment with the different ways of settings prefs.  The results can be determined by reading them and/or viewing what appears in about:config and prefs.js.

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
---
<b id="f1">1</b> The deprecation of XUL/XPCOM addons eliminates the primary external consumer of those APIs.  There are plans to remove some of those APIs and rewrite others.  That, combined with the relative obscurity of autoconfig and its more telemetry-resistent user base, may lead to some XPCOM utilizing autoconfig files being broken.  Those using, or wanting to use, autoconfig should keep this in mind.  If there is something you are using, or believe is important to keep, you should get involved on the bugzilla and developer fronts.[↩](#a1)

