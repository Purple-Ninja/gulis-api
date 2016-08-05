/* jshint node: true, devel: true */
'use strict';

var app = require('express')();
var bodyParser = require('body-parser');
var beauty = require('./lib/beauty-elasticsearch');
var config = require('config');
var db = config.get('db.elasticsearch');

// set db uri
beauty.source.setUri(db.uri);

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Routes
/*
 * entry for search
 * query
 *  keyword: 長腿
 *  push: 46
 *  limit: 2
 */
app.get('/beauty/search', beauty.search);

/*
 * entry for handling user feedback
 * body
 *  like: true/false
 *  imgId: target image id
 *  userId: user id
 */
// app.post('/beauty/feedback', beauty.feedback);

/*
 * entry for logging
 * body
 *  user: {string} user id or user name
 *  raw: {string} user's raw input
 *  (optional) meta: {object} containing user_id, user_ip
 */
// app.post('/beauty/logging', beauty.logging);

/*
 * entry for getting trending
 * query
 *  (optional) userId
 */
// app.get('/beauty/trending', beauty.trending);

// start server after connecting to mongodb
app.listen(app.get('port'), function() {
    console.log('[node] app is running on port', app.get('port'));
});

module.exports = app;

