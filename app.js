/* jshint node: true, devel: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongouri = process.env.MONGOURI || 'mongodb://localhost:27017/slack';
var app = express();
var db;
var beauty;

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

MongoClient.connect(mongouri, function(err, database) {
    console.log('[mongo] connected to %s', mongouri);

    // global variable for the mongo db
    db = database;

    // pass the db cursor to beauty lib
    beauty = require('./lib/beauty')(db);

    // Routes
    /*
     * entry for search
     * query
     *  keyword: 長腿
     *  push: 46
     *  type: 神人
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
    app.post('/beauty/feedback', beauty.feedback);

    /*
     * entry for logging
     * body
     *  user: {string} user id or user name
     *  raw: {string} user's raw input
     *  (optional) meta: {object} containing user_id, user_ip
     */
    app.post('/beauty/logging', beauty.logging);

    /*
     * entry for getting trending
     * query
     *  (optional) userId
     */
    app.get('/beauty/trending', beauty.trending);

    // start server after connecting to mongodb
    app.listen(app.get('port'), function() {
        console.log('[node] app is running on port', app.get('port'));
    });
});

module.exports = app;

