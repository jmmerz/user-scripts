// ==UserScript==
// @name        Flag Localhost Page Titles
// @version     1.0
// @description Append "[LOCALHOST]" to the end of page titles for locally hosted apps.
// @namespace   https://github.com/jmmerz/user-scripts
// @author      jmmerz
// @include     http://localhost/*
// @include     http://localhost:*/*
// @include     https://localhost/*
// @include     https://localhost:*/*
// @grant       none
// ==/UserScript==

/* ===========================================================
 * Release History:
 * 1.0 (2020-05-15)
 *   - Initial commit
 * =========================================================== */

document.title = document.title + ' [LOCALHOST]';

