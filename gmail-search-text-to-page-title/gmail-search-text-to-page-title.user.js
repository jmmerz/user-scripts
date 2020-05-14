// ==UserScript==
// @name         GMail - Search Text to Page Title
// @namespace    https://github.com/jmmerz/user-scripts
// @version      1.1
// @description  Add the text of a search to GMail page title to make browser history more useful
// @author       jmmerz
// @match        https://mail.google.com/mail/u/*
// @grant        none
// ==/UserScript==

/* ===========================================================
 * Release History:
 * 1.1 (2020-05-14)
 *   - Update method for finding search input fields.
 *   - Add ability to set title text when loading GMail with a URL containing a search
 *
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
            /** Function to set the document title iff we are on a search output page */
            let setDocumentSearchTitle = function(searchText) {
                if(document.title.startsWith("Search results - ")) {
                    document.title = document.title.replace(" - ", ": '" + searchText.trim() + "' - ");
                }
            };

            // Install mutation observer for document.title
            var docTitleTarget = document.querySelector('title');
            var titleObserver = new MutationObserver(function(mutations) {
                setDocumentSearchTitle(SearchTitle.mostRecentSearchText);
            });
            var config = {
                childList: true,
            };
            titleObserver.observe(docTitleTarget, config);

            var keydownEventListener = function(evt) {
                if(evt.keyCode == 13) { // <Enter>
                    SearchTitle.mostRecentSearchText = evt.target.value;
                }
            };

            // Install event listener on form.
            // TODO: Could potentially just query the form data from inside of the document title MutationObserver
            //var inputFields = searchForm.getElementsByClassName("gb_nf");
            var inputFields = searchForm.getElementsByTagName("input");
            for(let inputField of inputFields) {
                inputField.addEventListener('keydown', keydownEventListener, false);

                // In case the page being loaded already has a search, enter that:
                if(inputField.value !== null && inputField.value !== '') {
                    SearchTitle.mostRecentSearchText = inputField.value;
                    setDocumentSearchTitle(SearchTitle.mostRecentSearchText);
                }
            }

            //alert('event added');
        }
    }

    installSearchEvent();

})();
