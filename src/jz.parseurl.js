/**
 * Copyright (c) 2012 Joseph Zimmerman http://joezimjs.com
 * 
 * This script is licensed under the 
 * GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */

/**
 * Joe Zim's URL Parser Plugin (JZ Parse URL)
 * Version: 1.0
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
 * parameter to JZ.parseUrl.
 *
 * JZ.parseUrl("http://example.com:3000/pathname/?search=test#hash");
 *
 *
 * To parse a URL relative to this page's URL, pass in a partial URL as a
 * string as the sole parameter to JZ.parseUrl.
 *
 * JZ.parseUrl("/contact");
 *
 *
 * To parse the current URL of the page that you are on, then do not pass in
 * any parameters.
 *
 * JZ.parseUrl();
 *
 *
 * The object returned from JZ.parseUrl has several properties containing the
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

(function( $, window, undefined ) {
	'use strict';

	var document = window.document;
	var props = ['hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'url'];

	var createLink = function( url ) {
		// If a URL was provided, create an anchor tag
		if ( url && typeof(url) === "string" ) {
			var div = document.createElement('div');
		    div.innerHTML = "<a></a>";
		    div.firstChild.href = url;		// Ensures that the href is properly escaped
		    div.innerHTML = div.innerHTML;	// Run the current innerHTML back through the parser

		    link = div.firstChild;
		}
		// Otherwise use the current URL
		else {
			link = window.location;
		}		
	}
	
	// Some browser do not have the leading slash. Add it
	var normalizePath = function( path ) {
		if ( path.substring( 0, 1) !== "/" ) {
			path = "/" + path;
		}

		return path;
	}

	// Convert the query string into an object
	var parseQueryString = function( query ) {
		var params = {}, i, l;

		// If there was no query string return an empty object
		if ( !query.length ) {
			return params;
		}

		// Remove the ?
		query = query.substring(1);

		// Split into key/value pairs
		query = query.split("&");

		// Convert the array of strings into an object
		for (i=0, l=query.length; i < l; i++) {
			var split = query[i].split('=');

			// Vars that only have a key and no value get changed to TRUE
			split[1] = split[1] === undefined ? true : split[1];

			// Assign key-value pair to params and unescape them
			params[unescape(split[0])] = unescape(split[1]);
		}

		return params;
	};

	var Parser = function ( link ) {		
		var i = props.length;

		// Copy useful link properties to the parser object
		while (i--) {
			this[props[i]] = link[props[i]];
		}

		// Object function that returns query parameter values.
		this.get = function ( param ) {
			return this.query[param];
		}
	}

	/* Utility method to take a URL and parse it via the DOM's built-in
	parsing methods on anchor elements and window.location. */
	$.parseUrl = function( url ) {
		var link = createLink( url );

		// Parse query string into object
		link.query = parseQueryString(link.search);

		// Create .path as alias for pathname
		link.path = link.pathname = normalizePath( link.path );

		// Create .url as alias for href
		link.url = link.href;

		return Parser(link);
	};

}( JZ, window ));