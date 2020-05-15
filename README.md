# TamperMonkey UserScripts

Just a versioned storage bin for my UserScripts. These are developed for
[TamperMonkey](https://www.tampermonkey.net/) which is what I've been using in
recent years, but they may work on [GreaseMonkey](https://www.greasespot.net/)
as well.

----

## [GMail: Search Text to Page Title](gmail-search-text-to-page-title)
Normally, when using the GMail search function, the page title (and therefore your browser history) reads something like:
> Search results - your.email@gmail.com - Gmail

This script adds the contents of the search field to the page title so that it will instead read:
> Search results - **'what you searched for'** - your.email@gmail.com - Gmail

----

## [Flag Localhost Page Titles](flag-localhost-page-titles)
Useful for software development. When visiting a URL from `localhost`, this appends `[LOCALHOST]` to the page title to make it more obvious.

----

## [Stash Page Title Enhancements](stash-page-title-enhancements)
On Stash (BitBucket Server) pages:
* Add the repo name to the page title
* Change the string `"Pull Request"` to `"PR"` to make the most interesting parts of the title more visible.

----
