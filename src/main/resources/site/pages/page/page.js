var contentLib = require('/lib/xp/content');
var menuLib = require('/lib/efn/menu');
var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('page.html');

function handleGet(request) {
    var site = portalLib.getSite();
    var reqContent = portalLib.getContent();
    var isEnglishCorner = reqContent._path.startsWith('/efn/en/');
    var norwegianRootContent = contentLib.get({ key: '/efn/no' });
    var mainMenuItems = menuLib.getSubMenus(norwegianRootContent, 1); // get 1 level

    // Get submenu from the third level, such as beneath /efn/no/nyheter
    var pathSplitByLevels = reqContent._path.split('/');
    var pathThreeLevelsDeep = (pathSplitByLevels.length > 3) ? pathSplitByLevels.slice(0,4).join('/') : null;
    var subMenuRootContent = pathThreeLevelsDeep ? contentLib.get({ key: pathThreeLevelsDeep }) : null;
    var subMenuItems = subMenuRootContent ? menuLib.getSubMenus(subMenuRootContent, 2) : []; // get 2 levels
    if (subMenuItems.length == 0) subMenuItems = null;

    var model = {
        context: request,
        mainMenuItems: mainMenuItems,
        reqContent: reqContent,
        site: site,
        subMenuItems: subMenuItems
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
