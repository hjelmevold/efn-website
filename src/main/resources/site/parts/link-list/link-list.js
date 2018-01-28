var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var utilLib = require('/lib/enonic/util');

var view = resolve('link-list.html');



function handleGet(request) {

    var component = portalLib.getComponent();
    var config = component.config;

    var links = [];
    if (config.links) {
        links = utilLib.data.forceArray(config.links).map(function(link) {
            var url = '';
            if (link.target) {
                if (link.target._selected === 'internal' && link.target.internal && link.target.internal.content) {
                    url = portalLib.pageUrl({
                        id: link.target.internal.content
                    });
                } else if (link.target.url) {
                    url = link.target.url.href;
                }
            }

            // each link object
            return {
                text: link.text,
                url: url
            }
        });
    }

    var model = {
        heading: config.heading || '',
        links: links
    };

    return {
        contentType: 'text/html',
        body: thymeleafLib.render(view, model)
    };
}



exports.get = handleGet;
