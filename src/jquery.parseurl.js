/**
 * Copyright (c) 2012 Joseph Zimmerman http://joezimjs.com
 * 
 * This script is licensed under the 
 * GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */

/**
 * Joe Zim's jQuery URL Parser Plugin (JZ Parse URL)
 * Version: 1.0
 * Supported jQuery Versions: 1.4.3+
 *
 * This plugin uses the technique discussed in the Gist by John Long to parse
 * a URL via the DOM's automatic href parsing on anchor elements. It also 
 * creates a couple aliases (path for pathname; url for href) for shorter and
 * more semantic names. Finally, the biggest reason to use this libary is for
 * query string parsing. For every URL, this plugin will take the query string
 * and convert it into an object and unescape both the keys and values.
 *
 * John Long's Gist: https://gist.github.com/2428561
 *
 *
 * USAGE
 * To parse a full URL, just pass the entire URL as a string as the sole
 * parameter to jQuery.parseUrl (or JZ.parseUrl if jQuery was not loaded before
 * this plugin was).
 *
 * $.parseUrl("http://example.com:3000/pathname/?search=test#hash");
 *
 *
 * To parse a URL relative to this page's URL, pass in a partial URL as a
 * string as the sole parameter to jQuery.parseUrl (or JZ.parseUrl if jQuery
 * was not loaded before this plugin was).
 *
 * $.parseUrl("/contact");
 *
 *
 * To parse the current URL of the page that you are on, then do not pass in
 * any parameters.
 *
 * $.parseUrl();
 *
 *
 * The object returned from $.parseUrl has several properties containing the
 * different parts of a URL. If I ran the first example with the full URL, I
 * would receive the following object back:
 *
 * {
 *		hash: 		"#hash",
 *		host: 		"example.com:3000",
 *		hostname: 	"example.com",
 *		href: 		"http://example.com:3000/pathname/?search=test#hash",
 *		path: 		"/pathname/",
 *		pathname: 	"/pathname/",
 *		port: 		"3000",
 *		protocol: 	"http:",
 *		query: 		{ search: test },
 *		search: 	"?search=test",
 *		url: 		"http://example.com:3000/pathname/?search=test#hash"
 * }
 *
 * The path property is an alias for pathname. The url propett is an alias for
 * href. The query property is search converted into an object for simple
 * access to each of the parameters.
 */

;var JZ = JZ || {};

(function ( $, window, undefined ) {
	'use strict';

	var document = window.document;
	var props = ['hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'url'];

	/* jQuery utility method to take a URL and parse it via the DOM's built-in
	parsing methods on anchor elements and window.location. */
	$.parseUrl = function(url) {
		var link;

		// If a URL was provided, create an anchor tag
		if (url && $.type(url) === "string") {
			link = document.createElement('a');
			link.href = url;
		}
		// Otherwise use the current URL
		else {
			link = window.location;
		}

		// Parse query string into object
		link.query = parseQueryString(link.search);

		// Create .path as alias for pathname
		link.path = link.pathname;

		// Create .url as alias for href
		link.url = link.href;

		return createPlainParser(link);
	};

	// Convert the query string into an object
	function parseQueryString(query) {
		var params = {};

		// If there was no query string return an empty object
		if ( !query.length ) {
			return params;
		}

		// Remove the ?
		query = query.substring(1, query.length);

		// Split into key/value pairs
		query = query.split("&");

		// Convert the array of strings into
		$.each(query, function() {
			var temp = this.split('=');
			params[unescape(temp[0])] = unescape(temp[1]);
		});

		return params;
	};

	/* Copy the properties we need to a new object so that we no longer have
	extra properties unrelated to URL parsing */
	function createPlainParser(link) {
		var i = props.length;
		var parser = {};

		// Copy useful link properties to the parser object
		while (i--) {
			parser[props[i]] = link[props[i]];
		}

		return parser;
	}

}(jQuery || JZ, window));