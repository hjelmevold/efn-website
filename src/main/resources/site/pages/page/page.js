var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('page.html');

function handleGet(request) {
    var site = portalLib.getSite();
    var reqContent = portalLib.getContent();

    var model = {
        context: request,
        site: site,
        reqContent: reqContent
    };

    return {
        contentType: 'text/html',
        body: thymeleafLib.render(view, model)
    };
}

exports.get = handleGet;


/*
 * The following DataSources were used in the original CMS page template:

 <datasources>
    <datasource name="getMenuBranch" result-element="menu">
      <parameter name="menuItemKey">${portal.pageKey}</parameter>
      <parameter name="includeTopLevel">true</parameter>
      <parameter name="startLevel">0</parameter>
      <parameter name="levels">0</parameter>
    </datasource>
    <datasource name="getPreferences">
      <parameter name="scope">*</parameter>
      <parameter name="keyPattern">*</parameter>
    </datasource>
  </datasources>

 */
