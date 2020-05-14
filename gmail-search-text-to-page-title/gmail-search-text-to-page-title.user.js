// ==UserScript==
// @name         GMail - Search Text to Page Title
// @namespace    https://github.com/jmmerz/user-scripts
// @version      1.0
// @description  Add the text of a search to GMail page title to make browser history more useful
// @author       jmmerz
// @match        https://mail.google.com/mail/u/*
// @grant        none
// ==/UserScript==

/* ===========================================================
 * Release History:
 * 1.0 (2020-04-13)
 *   - Initial release
 * =========================================================== */

(function() {
    'use strict';

    var SearchTitle = {
        /** Used to quit trying to find searchForm if it's not showing up */
        searchBoxFindAttemptCount: 0,
        timeoutId: null,
        mostRecentSearchText: null
    }

    function installSearchEvent() {
        if(SearchTitle.timeoutId !== null) {
            window.clearTimeout(SearchTitle.timeoutId);
        }

        var searchForm = document.getElementById('aso_search_form_anchor');
        if(searchForm == null) {
            if(SearchTitle.searchBoxFindAttemptCount++ < 20) {
                SearchTitle.timeoutId = window.setTimeout(installSearchEvent, 1000);
            } else {
                // Give up - probably no searchForm in this window/frame
                return;
            }
            return;
        } else {
            // Install mutation observer for document.title
            var docTitleTarget = document.querySelector('title');
            var titleObserver = new MutationObserver(function(mutations) {
                if(document.title.startsWith("Search results - ")) {
                    document.title = document.title.replace(" - ", ": '" + SearchTitle.mostRecentSearchText + "' - ");
                }
            });
            var config = {
                childList: true,
            };
            titleObserver.observe(docTitleTarget, config);

            var keydownEventListener = function(ev) {
                if(ev.keyCode == 13) { // <Enter>
                    SearchTitle.mostRecentSearchText = ev.target.value;
                }
            };

            // Install event listener on form.
            // TODO: Could potentially just query the form data from the document title MutationObserver
            var inputFields = searchForm.getElementsByClassName("gb_jf");
            for(var i = 0; i < inputFields.length; i++) {
                if(inputFields[i].nodeName == "INPUT") {
                    //inputFields[i].addEventListener('keypress', keypressEventListener, false);
                    inputFields[i].addEventListener('keydown', keydownEventListener, false);
                }
            }

            //alert('event added');
        }
    }

    installSearchEvent();

})();
