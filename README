# JZ Parse URL

## No Longer In Development

**This library is no longer supported. It was more of a proof of concept than anything and there are far better libraries for parsing URLs out there. If you are in Node.js, you can use their built-in [URL API](https://nodejs.org/api/url.html), or in the browser you can use something like [URI.js](http://medialize.github.io/URI.js/).**

![JZ Parse URL Logo](/wp-content/uploads/parse_url_logo.png "JZ Parse URL Logo")Generally, the fastest way to parse a URL is via a regular expression. Obviously, not everyone is good with regular expressions and would rather use a plugin or library. This script is here for those people, but does not use a regular expression. Instead it uses the DOM to parse the URL and then throws a few extra bits in to make things better and more useable. This jQuery plugin can also be used as a standalone library: if jQuery is not loaded when this script is loaded, then `parseUrl` is attached to a global object named `JZ`. If you experience any bugs, please [report them as an issue on GitHub](https://github.com/joezimjs/JZ-Parse-URL/issues "Issue Reporting").

## Table of Contents

*   [Download](#toc-download)
*   [Dependencies](#toc-dep)
*   [$.parseUrl()](#toc-parse)
*   [Properties](#toc-props)
*   [Version History](#toc-version)

## <span id="toc-download">Download</span>

JZ Parse URL is currently on version 1.0\. You can [view the version history here](#toc-version). Go to the [JZ Parse URL GitHub Repository](https://github.com/joezimjs/JZ-Parse-URL "GitHub Repository for JZ Parse URL jQuery Plugin") to download and view the tests.

## Documentation

### <span id="toc-dep">Dependencies</span>

JZ Parse URL is not dependent on any libraries, though it is designed to attach itself to `jQuery` as a utility function if it's available. No specific version of jQuery is required.

### <span id="toc-parse">$.parseUrl()</span>

**`jQuery.parseUrl( [url] ) or JZ.parseUrl( [url] )`**

- `url`: A relative or absolute URL string. If no URL is provided, the current location is used.
- Returns an object with numerous properties mapping to their respective portions of the URL. You can read more about it in the [Properties Section](#toc-props).

The `parseUrl` method is the bread and butter of this library. Just call it with or without passing a URL in and it will return an object with parsed URL properties:

```js
// To parse a full URL, just pass the entire URL as a string as
// the sole parameter to jQuery.parseUrl (or JZ.parseUrl if
// jQuery was not loaded before this plugin was).
$.parseUrl("http://example.com:3000/pathname/?srch=test#hash");

// To parse a URL relative to this page's URL, pass in a partial
// URL as a string as the sole parameter to jQuery.parseUrl (or
// JZ.parseUrl if jQuery was not loaded before this plugin was).
$.parseUrl("/contact");

// To parse the current URL of the page that you are on, then
// do not pass in any parameters.
$.parseUrl();
```

### <span id="toc-props">Properties</span>

When `parseUrl` is invoked, it returns an object with several properties. You can see those properties listed below and example of what they would be:

```js
// If I ran the first example above with the full URL, I
// would receive the following object back:
{
    hash:      '#hash',
    host:      'example.com:3000',
    hostname:  'example.com',
    href:      'http://example.com:3000/path/?srch=test#hash',
    path:      '/path/',
    pathname:  '/path/',
    port:      '3000',
    protocol:  'http:',
    query:     { srch: 'test' },
    search:    '?srch=test',
    url:       'http://example.com:3000/path/?srch=test#hash'
}
```

The `path` property is an alias for `pathname`. The `url` property is an alias for `href`. The `query` property is `search` converted into an object for simple access to each of the parameters.

### <span id="toc-version">Version History</span>

- **Version 1.0**: ([May 23, 2012 Announcement](/javascript/new-project-released-jz-parse-url-jquery-plugin/ "New Project Released: JZ Parse URL jQuery Plugin"))
  * Original Release.
