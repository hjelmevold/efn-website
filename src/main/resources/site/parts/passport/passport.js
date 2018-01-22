var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('passport.html');

function handleGet(req) {

    var params = {
        partName: "passport"
    };

    var body = thymeleafLib.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;

/*
 * The following DataSources were used in the original CMS portlet:

<datasources>
  <datasource name="getSessionContext" result-element="context"/>
  <!--datasource name="getMenuBranch" result-element="menu">
  <parameter name="menuItemKey">${portal.pageKey}</parameter>
  <parameter name="includeTopLevel">true</parameter>
  <parameter name="startLevel">0</parameter>
  <parameter name="levels">0</parameter>
</datasource>
  <datasource name="getPreferences">
  <parameter name="scope">*</parameter>
  <parameter name="keyPattern">*</parameter>
</datasource-->
  <datasource name="getUserStore">
    <parameter name="name"/>
  </datasource>
  <datasource name="getTimeZones"/>
  <datasource name="getLocales"/>
  <datasource name="getCountries">
    <parameter name="countryCodes"/>
    <parameter name="includeRegions">true</parameter>
  </datasource>
</datasources>

*/
