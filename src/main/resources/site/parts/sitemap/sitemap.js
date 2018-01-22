var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('sitemap.html');

function handleGet(req) {

    var params = {
        partName: "sitemap"
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
    <datasource name="getMenu">
      <parameter name="siteKey">0</parameter>
      <parameter name="tagItem">${portal.pageKey}</parameter>
      <parameter name="levels">0</parameter>
    </datasource>
  </datasources>

*/
