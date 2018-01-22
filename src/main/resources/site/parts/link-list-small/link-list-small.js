var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('link-list-small.html');

function handleGet(req) {

    var params = {
        partName: "link-list-small"
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
    <parameter name="menuItemKeys">${select(getPageKeyByPath('./nyttige-lenker'), -1)}</parameter>
    <parameter name="levels">1</parameter>
    <parameter name="query">contenttype = 'lenke'</parameter>
    <parameter name="orderBy"/>
    <parameter name="index">${select(param.index, 0)}</parameter>
    <parameter name="count">20</parameter>
    <parameter name="includeData">true</parameter>
    <parameter name="childrenLevel">1</parameter>
    <parameter name="parentLevel">0</parameter>
  </datasource>
</datasources>

*/
