var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var utilLib = require('/lib/enonic/util');
var moment = require('/assets/momentjs/2.12.0/min/moment-with-locales.min.js');

var view = resolve('article-list.html');



function handleGet(request) {

    var component = portalLib.getComponent();
    var config = component.config;

    var start = request.params.index || 0;
    var count = request.params.count || config.count || 10;
    var total = 0;

    var articles = [];

    // Articles from search result
    if (request.params.q) {
        var articleQuery = contentLib.query({
            start: start,
            count: count,
            query: "fulltext('data.*', '" + request.params.q + "', 'AND')", // TODO: wash param input, make data.* configurable as TextLine in part config
            contentTypes: [ app.name + ':artikkel' ]
            // sort using elasticsearch scoring, disregard what's specified in the part config
            //sort: config.sortExpression ? config.sortExpression : '_manualOrderValue DESC'
        });

        total = articleQuery.total;
        articles = articleQuery.hits;
    }

    // Articles specified manually in part config
    else if (config.source && config.source._selected === 'manual' && config.source.manual.content) {
        var contentIds = utilLib.data.forceArray(config.source.manual.content);
        contentIds.forEach(function (id) {
            articles.push(contentLib.get({ key: id }));
        });
        // numArticles in config is disregarded, no limit
        // TODO: make sure showPagination is then set to false in the model
    }

    // Articles that are children of a content
    else {
        var parentContentId = portalLib.getContent()._id; // fallback. by default, the current content is used as parent
        if (config.source && config.source._selected === 'children' && config.source.children.content) {
            parentContentId = config.source.children.content;
        }
        var parentContent = contentLib.get({ key: parentContentId });

        /*
        // unfortunately, getChildren does not allow filtering on content type. let's use contentLib.query() instead.
        var articleQuery = contentLib.getChildren({
            key: parentContentId,
            start: start,
            count: count
        });
        */

        // Get all content that has the CMS content home set (DEPRECATED!)
        //var query = "x.no-efn-xp-app-website.cmsContent.contentHome = '" + parentContentId + "'";

        // Get articles beneath current content's path
        var query = "type = '" + app.name + ":artikkel' AND _parentPath = '/content" + parentContent._path + "'";

        var articleQuery = contentLib.query({
            start: start,
            count: count,
            query: query,
            sort: config.sortExpression ? config.sortExpression : '_manualOrderValue DESC'
        });

        total = articleQuery.total;
        articles = articleQuery.hits;
    }

    // Process each article data
    articles = articles.map(function(article) {
        // Date
        var publishDateSource = article.data.created || article.publish.from || article.createdTime;
        var locale = article.language || 'nb';
        article.formattedDate = moment(publishDateSource).locale(locale).format('DD/MM/YYYY');

        // Link
        article.pageUrl = portalLib.pageUrl({ id: article._id });

        // Preface crop
        article.prefaceCropped = (article.data.preface.length >= 320)
            ? article.data.preface.slice(0, 319) + "…"
            : article.data.preface

        return article;
    });

    var model = {
        // TODO: search (total)
        // TODO: pagination (index, count, q)
        articles: articles,
        start: start,
        total: total,
        heading: config.heading,
        readMoreTarget: config.readMoreTarget ? portalLib.pageUrl({ id: config.readMoreTarget }) : null,
        showPagination: config.showPagination,
        useSmallDesign: config.useSmallDesign,
    };

    return {
        contentType: 'text/html',
        body: thymeleafLib.render(view, model)
    };
}



exports.get = handleGet;
