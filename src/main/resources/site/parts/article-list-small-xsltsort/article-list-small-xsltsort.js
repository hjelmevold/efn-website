var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('article-list-small-xsltsort.html');

function handleGet(req) {

    var params = {
        partName: "article-list-small-xsltsort"
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
        <parameter name="menuItemKeys">${select(getPageKeyByPath('/no/nyheter'), -1)}</parameter>
        <parameter name="levels">1</parameter>
        <parameter name="query">contenttype = 'artikkel' OR contenttype = 'lenke'</parameter>
        <!--parameter name="orderBy">data.created DESC</parameter-->
        <parameter name="orderBy">timestamp DESC</parameter>
        <parameter name="index">${select(param.index, 0)}</parameter>
        <parameter name="count">1000</parameter>
        <parameter name="includeData">true</parameter>
        <parameter name="childrenLevel">1</parameter>
        <parameter name="parentLevel">0</parameter>
    </datasource>
</datasources>

*/
