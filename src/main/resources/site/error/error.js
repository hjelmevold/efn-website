var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');

var view = resolve('error.html');

/*
exports.handle404 = function (err) {
    var body = thymeleaf.render(view404, {});
    return {
        contentType: 'text/html',
        body: body
    }
};
*/

exports.handleError = function (err) {
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }

    // Redirect old RSS feed requests to new RSS feeds
    if (err.request.params.section) {
        if (err.request.params.section === '34') {
            return {
                redirect: portal.pageUrl({
                    path: '/efn/rss/nytt-fra-det-offentlige.rss'
                })
            }
        }
        if (err.request.params.section === '18') {
            return {
                redirect: portal.pageUrl({
                    path: '/efn/rss/pressemeldinger.rss'
                })
            }
        }
    }

    var errorImgUrl = portal.assetUrl({
        path: '/skins/advanced/efn/images/500.jpg'
    });
    if (err.status == 401 || err.status == 403 || err.status == 404) {
        errorImgUrl = portal.assetUrl({
            path: '/skins/advanced/efn/images/' + err.status + '.jpg'
        });
    }

    var model = {
        description: (err.status == 404) ? 'Kunne ikke finne siden eller ressursen' : 'Det oppsto en uventet feil',
        errorCode: err.status,
        errorImgUrl: errorImgUrl,
        heading: (err.status == 404) ? 'Fant ikke ressurs' : 'Systemfeil'
    };

    var body = thymeleaf.render(view, model);

    return {
        contentType: 'text/html',
        body: body
    }
};
