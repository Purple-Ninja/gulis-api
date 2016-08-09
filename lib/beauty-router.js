/* jshint node: true, devel: true */
'use strict';

var Search = require('./search');
var Logging = require('./logging');
var Trending = require('./trending');

var Beauty = {

    search: Search.search,

    trending: Trending.hot,

    logging: Logging.querylog,

    feedback: Logging.feedback
};

module.exports = Beauty;
