// ==UserScript==
// @name         Stash - Add Comment Links
// @version      1.0.2
// @description  For each Stash Comment, add a link that goes directly to the comment.
// @namespace    https://github.com/jmmerz/user-scripts
// @author       jmmerz
// @include      https://stash.glassdoor.com/*/pull-requests/*
// @grant        none
// @run-at       document-idle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.js
// ==/UserScript==

/* ===========================================================
 * Release History:
 * 1.0.2 (2020-05-14)
 *   - First commit.
 * =========================================================== */

(function() {
    'use strict';

    var _LINK_TITLE = 'Link';
    var _REPEAT_INTERVAL = 5000;

    var _addCommentLinks = function(target) {
        var count = 0;
        $(target).find('li.comment:not([handled])').each(function(index, commentElement) {
            //alert('starting');
            var $commentElement = $(commentElement);
            var commentId = $commentElement.data('id');
            if(commentId > 0) {
                //alert(commentElement + 'commentId=' + commentId);
                var $actionList = $commentElement.find('ul.actions').first();
                //alert($actionList);
                var pageUrl = window.location.href;
                pageUrl = pageUrl.replace(/(pull-requests\/\d*\/)diff.*/, '$1overview');
                $actionList.append("<li><a href='" + pageUrl + "?commentId=" + commentId + "&action=view'>" + _LINK_TITLE + "</a></li>");
                $commentElement.attr('handled', '');
                count++;
                //alert('finished: ' + commentId);
            }
        });
        return count;
    };

    // Need to invoke this once in order to find comments not related to code which are loaded with the page
    //setInterval(_addCommentLinks, _REPEAT_INTERVAL); // Repeat every _REPEAT_INTERVAL seconds

    /** This is the observer that actually adds comment links as comments are added to the page. */
    var commentAdditionObserver = new MutationObserver(function(mutations) {
        for(var mutation of mutations) {
            if(mutation.type == 'childList') {
                if(_addCommentLinks(mutation.target) > 0) {
                    break;
                }
            }
        }
    });

    /** The commit-file-content is on the diff page, and is not always present at initial page rendering time.
     *  This observer notes when it is present and sets the commentAdditionObserver to watch it once found.
     */
    var commitFileContentFinderObserver = new MutationObserver(function(mutations) {
        for(var mutation of mutations) {
            if(mutation.type == 'childList') {
                var commitFileContent = document.getElementById('commit-file-content');
                if(commitFileContent != null && _addCommentLinks(commitFileContent) > 0) {
                    //alert(commitFileContent.id);
                    commentAdditionObserver.observe(commitFileContent, {childList: true, subtree: true});
                    commitFileContentFinderObserver.disconnect();
                }
            }
        }
    });

    /** The pull-request-activity is on the overview page, and is not always present at initial page rendering time.
     *  This observer notes when it is present and sets the commentAdditionObserver to watch it once found.
     */
    var pullRequestActivityFinderObserver = new MutationObserver(function(mutations) {
        for(var mutation of mutations) {
            if(mutation.type == 'childList') {
                var pullRequestActivity = document.getElementById('pull-request-activity');
                if(pullRequestActivity != null && _addCommentLinks(pullRequestActivity) > 0) {
                    //alert(pullRequestActivity.id);
                    commentAdditionObserver.observe(pullRequestActivity, {childList: true, subtree: true});
                    pullRequestActivityFinderObserver.disconnect();
                }
            }
        }
    });

    commitFileContentFinderObserver.observe(document, {childList: true, subtree: true});
    pullRequestActivityFinderObserver.observe(document, {childList: true, subtree: true});
    commentAdditionObserver.observe(document.getElementById('pull-request-activity'), {childList: true, subtree: true});

    _addCommentLinks(document);

})();
