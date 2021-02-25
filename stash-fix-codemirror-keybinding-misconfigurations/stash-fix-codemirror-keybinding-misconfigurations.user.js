// ==UserScript==
// @name         Stash - Fix CodeMirror KeyBinding Misconfigurations
// @namespace    https://github.com/jmmerz/user-scripts
// @version      1.0
// @description  The Home/End keys are configured by default to go to start/end of paragraph rather than current line, and there is a bug in the Up key. This re-binds those keys to work around.
// @author       jmmerz
// @include      https://*stash*/*/pull-requests/*
// @grant        none
// ==/UserScript==

/* ===========================================================
 * Release History:
 * 1.0 (2021-02-25)
 *   - Initial version
 * =========================================================== */

/* Stash uses CodeMirror for comment editing, and it seems like the default
 * bindings some keys on Windows are flaky. Examples:
 * - The <Home>/<End> keys take the cursor to the start/end of the _paragraph_
 *   rather than the line.
 * - If you use End (which goes to end of paragraph) and the last line has the
 *   same length as the second to last line, and then you press the <Up> arrow
 *   key, the cursor moves to the start of the last line rather than the end of
 *   the second-to-last line. This same thing occurs even after applying the
 *   fix below to the <End> key.
 *
 * There are two built-in CodeMirror commands that sound promising for the
 * Home/End case:
 * - goLineRight "Move the cursor to the right side of the visual line it is on."
 * - goLineLeft "Move the cursor to the left side of the visual line it is on.
 *               If this line is wrapped, that may not be the start of the line."
 *
 * Unfortunately, goLineRight seems to have an off-by-1 error and actually
 * moves to the start of the next line rather than end of current line.
 * Probably a similar error exists in goLineUp (default binding for the <Up>
 * key).
 *
 * Instead, CodeMirror offers the option to let the *browser* handle the keys
 * by setting the mapping to false.
 *
 * See: * https://codemirror.net/doc/manual.html#keymaps
 *     The values of properties in key maps can be either functions of a single
 *     argument (the CodeMirror instance), strings, or false. Strings refer to
 *     commands, which are described below. If the property is set to false,
 *     CodeMirror leaves handling of the key up to the browser. A key handler
 *     function may return CodeMirror.Pass to indicate that it has decided not
 *     to handle the key, and other handlers (or the default behavior) should
 *     be given a turn.
 */
if(typeof CodeMirror !== undefined) {
    /* global CodeMirror */ // Define CodeMirror as global for eslint to not warn
    CodeMirror.keyMap.default.Home = false
    CodeMirror.keyMap.default.End = false

    CodeMirror.keyMap.default.Up = false
    CodeMirror.keyMap.default.Down = false
}
