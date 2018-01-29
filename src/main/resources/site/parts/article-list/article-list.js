var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleafLib = require('/lib/xp/thymeleaf');
var utilLib = require('/lib/enonic/util');
var moment = require('/assets/momentjs/2.12.0/min/moment-with-locales.min.js');

var view = resolve('article-list.html');



function handleGet(request) {

    var component = portalLib.getComponent();
    var config = component.config;

    var start = parseInt(request.params.index) || 0;
    var count = parseInt(request.params.count) || config.numArticles || 10;
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

    // Articles added to a specific section (DEPCRECATED)
    else if (config.source && config.source._selected === 'section' && config.source.section.content) {
        var sectionParent = contentLib.get({ key: config.source.section.content });
        if (sectionParent && sectionParent.data && sectionParent.data.sectionContents) {
            var articlesUnsorted = [];
            var articleIds = utilLib.data.forceArray(sectionParent.data.sectionContents);
            articleIds.forEach(function (id, index) {
                if (index < count) {
                    var article = contentLib.get({ key: id });
                    // Only get articles or links, not any content of other types
                    if (article.type === app.name + ':artikkel' || article.type === app.name + ':lenke') {
                        articlesUnsorted.push(article);
                    }
                }
            });
            // DOESN'T WORK!
            if (config.forceSortDateDescending) {
                articles = articlesUnsorted.sort(function(a,b) {
                    return new Date(b.createdTime) - new Date(a.createdTime);
                });
            } else {
                articles = articlesUnsorted;
            }
            // TODO: make sure showPagination is then set to false in the model
        }
    }

    // Articles that are children of a content
    else {
        var parentContentId = portalLib.getContent()._id; // fallback. by default, the current content is used as parent
        // Articles that are children of another specified content
        if (config.source && config.source._selected === 'children' && config.source.children.content) {
            parentContentId = config.source.children.content;
        }
        var parentContent = contentLib.get({ key: parentContentId });

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
        if (article.type === app.name + ':lenke') {

        } else {
            article.pageUrl = portalLib.pageUrl({ id: article._id });
        }

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
        showDate: config.showDate,
        showPagination: config.showPagination,
        useSmallDesign: config.useSmallDesign
    };

    return {
        contentType: 'text/html',
        body: thymeleafLib.render(view, model)
    };
}



exports.get = handleGet;
