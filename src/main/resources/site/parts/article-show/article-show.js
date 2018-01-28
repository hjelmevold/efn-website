var thymeleafLib = require('/lib/xp/thymeleaf');
var portalLib = require('/lib/xp/portal');
var moment = require('/assets/momentjs/2.12.0/min/moment-with-locales.min.js');

var view = resolve('article-show.html');

function handleGet(request) {

    log.info('request');
    log.info(JSON.stringify(request, null, 4));

    var content = portalLib.getContent({});
    log.info('content');
    log.info(JSON.stringify(content, null, 4));

    var publishDateSource = content.data.created || content.publish.from || content.createdTime;
    // TODO: prefer site language over content language?
    // NB: seems to always be english?
    var locale = content.language || 'nb';
    var publishDateFormatted = moment(publishDateSource).locale(locale).format('LL');

    var model = {
        partName: "article-show",
        heading: content.data.title || content._displayName,
        preface: content.data.preface,
        text: portalLib.processHtml({ value: content.data.text }),
        publishDate: publishDateFormatted,
        isAnonymous: content.data.anonymous
    };

    return {
        contentType: 'text/html',
        body: thymeleafLib.render(view, model)
    };
}

exports.get = handleGet;

/*
 * The following DataSources were used in the original CMS portlet:

<datasources>
    <datasource name="getContent">
        <parameter name="contentKeys">${select(param.key, -1)}</parameter>
        <parameter name="query"/>
        <parameter name="orderBy"/>
        <parameter name="index">0</parameter>
        <parameter name="count">1</parameter>
        <parameter name="includeData">true</parameter>
        <parameter name="childrenLevel">1</parameter>
        <parameter name="parentLevel">0</parameter>
    </datasource>
    <!--datasource name="getContentByCategory" result-element="files">
        <parameter name="categoryKeys">${select(param.cat,14)}</parameter>
        <parameter name="levels">1</parameter>
        <parameter name="query">contenttype = "fil"</parameter>
        <parameter name="orderBy">created DESC</parameter>
        <parameter name="index">${select(param.index, 0)}</parameter>
        <parameter name="count">1000</parameter>
        <parameter name="includeData">true</parameter>
        <parameter name="childrenLevel">0</parameter>
        <parameter name="parentLevel">0</parameter>
    </datasource-->
</datasources>

*/
