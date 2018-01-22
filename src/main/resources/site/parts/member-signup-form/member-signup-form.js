var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('member-signup-form.html');

function handleGet(req) {

    var params = {
        partName: "member-signup-form"
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
  <datasource name="getContentByQuery" result-element="medlem">
    <parameter name="query">contenttype = "medlem"</parameter>
    <parameter name="orderBy">created DESC</parameter>
    <parameter name="index">${select(param.index, 0)}</parameter>
    <parameter name="count">1</parameter>
    <parameter name="includeData">true</parameter>
    <parameter name="childrenLevel">0</parameter>
    <parameter name="parentLevel">0</parameter>
  </datasource>
  <datasource name="getContentByQuery" result-element="prevmemberid">
    <parameter name="query">contenttype = "medlem"</parameter>
    <parameter name="orderBy">data.memberid DESC</parameter>
    <parameter name="index">${select(param.index, 0)}</parameter>
    <parameter name="count">1</parameter>
    <parameter name="includeData">true</parameter>
    <parameter name="childrenLevel">0</parameter>
    <parameter name="parentLevel">0</parameter>
  </datasource>
  <datasource name="getContentByQuery" result-element="prevcheckid">
    <parameter name="query">contenttype = "innbetaling"</parameter>
    <parameter name="orderBy">data.checkid DESC</parameter>
    <parameter name="index">${select(param.index, 0)}</parameter>
    <parameter name="count">1</parameter>
    <parameter name="includeData">true</parameter>
    <parameter name="childrenLevel">0</parameter>
    <parameter name="parentLevel">0</parameter>
  </datasource>
  <datasource name="getContentByQuery" result-element="innbetaling">
    <parameter name="query">contenttype = "innbetaling"</parameter>
    <parameter name="orderBy">created DESC</parameter>
    <parameter name="index">${select(param.index, 0)}</parameter>
    <parameter name="count">1</parameter>
    <parameter name="includeData">true</parameter>
    <parameter name="childrenLevel">0</parameter>
    <parameter name="parentLevel">0</parameter>
  </datasource>
</datasources>

*/
