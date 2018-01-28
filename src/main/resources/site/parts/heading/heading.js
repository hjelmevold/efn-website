var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var view = resolve('heading.html');

function handleGet(req) {

    var content = portalLib.getContent();

    var model = {
        heading: content.displayName || ''
    };

    return {
        contentType: 'text/html',
        body: thymeleafLib.render(view, model)
    };
}

exports.get = handleGet;
