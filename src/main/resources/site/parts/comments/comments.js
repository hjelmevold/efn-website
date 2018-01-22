var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('comments.html');

function handleGet(req) {

    var params = {
        partName: "comments"
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
    <datasource name="getContent" result-element="article">
        <parameter name="contentKeys">${select(param.key, -1)}</parameter>
        <parameter name="query">contenttype = 'artikkel'</parameter>
        <parameter name="orderBy"/>
        <parameter name="index">0</parameter>
        <parameter name="count">1</parameter>
        <parameter name="includeData">true</parameter>
        <parameter name="childrenLevel">1</parameter>
        <parameter name="parentLevel">0</parameter>
    </datasource>
    <datasource name="getRelatedContent" result-element="comments">
        <parameter name="contentKeys">${select(param.key, -1)}</parameter>
        <parameter name="relation">-1</parameter>
        <parameter name="query">contenttype = 'kommentar'</parameter>
        <parameter name="orderBy">publishfrom ASC</parameter>
        <parameter name="index">0</parameter>
        <parameter name="count">1000</parameter>
        <parameter name="includeData">true</parameter>
        <parameter name="childrenLevel">0</parameter>
        <parameter name="parentLevel">0</parameter>
    </datasource>
</datasources>

*/
