var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('page.rss-producer.html');

function handleGet(req) {
    var site = portalLib.getSite();
    var reqContent = portalLib.getContent();

    var params = {
        context: req,
        site: site,
        reqContent: reqContent
    };

    var body = thymeleafLib.render(view, params);

    return {
        contentType: 'text/html',
        body: body
    };
}

exports.get = handleGet;


/*
 * The following DataSources were used in the original CMS page template:

 <datasources>
  <datasource name="getContentBySection">
    <parameter name="menuItemKeys">${select(param.section, 8)}</parameter>
    <parameter name="levels">${select(param.levels, 1)}</parameter>
    <parameter name="query">contenttype = 'artikkel'</parameter>
    <parameter name="orderBy">@publishfrom DESC</parameter>
    <parameter name="index">0</parameter>
    <parameter name="count">10</parameter>
    <parameter name="includeData">true</parameter>
    <parameter name="childrenLevel">1</parameter>
    <parameter name="parentLevel">0</parameter>
  </datasource>
  <datasource name="getMenuItem">
    <parameter name="menuItemKey">${select(param.section, 8)}</parameter>
    <parameter name="withParents">false</parameter>
  </datasource>
</datasources>

 */
