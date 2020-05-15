// ==UserScript==
// @name         Stash - Page Title Enhancements
// @namespace    https://github.com/jmmerz/user-scripts
// @version      1.0
// @description  Change the string "Pull Request" to PR in Stash page titles to make more of the relevant title visible and add the repo name.
// @author       jmmerz
// @include      https://*stash*/*/pull-requests/*
// @grant        none
// ==/UserScript==

/* ===========================================================
 * Release History:
 * 1.0 (2020-05-15)
 *   - Initial commit
 * =========================================================== */

var repoKey = document.location.href.match(".*/projects/.*/repos/([A-Za-z0-9-]*)/pull-requests/.*")[1];
document.title = document.title.replace("Pull Request #", repoKey + ":PR ");

