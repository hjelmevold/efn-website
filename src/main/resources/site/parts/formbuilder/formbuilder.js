var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('formbuilder.html');

function handleGet(req) {

    var params = {
        partName: "formbuilder"
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
    <datasource name="getMenuItem">
      <parameter name="menuItemKey">${portal.pageKey}</parameter>
      <parameter name="withParents">false</parameter>
    </datasource>
  </datasources>

*/
