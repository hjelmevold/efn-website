var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('article-list-small.html');

function handleGet(req) {

    var params = {
        partName: "article-list-small"
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
    <datasource name="getContentBySection">
      <parameter name="menuItemKeys">${portal.pageKey}</parameter>
      <parameter name="levels">1</parameter>
      <parameter name="query">contenttype = 'artikkel'</parameter>
      <parameter name="orderBy"/>
      <parameter name="index">${select(param.index, 0)}</parameter>
      <parameter name="count">10</parameter>
      <parameter name="includeData">true</parameter>
      <parameter name="childrenLevel">1</parameter>
      <parameter name="parentLevel">0</parameter>
    </datasource>
  </datasources>

*/
