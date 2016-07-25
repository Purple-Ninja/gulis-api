/* jshint node: true, devel: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongouri = process.env.MONGOURI || 'mongodb://localhost:27017/slack';
var app = express();
var db;

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

MongoClient.connect(mongouri, function(err, database) {
    console.log('[mongo] connected to %s', mongouri);

    // global variable for the mongo db
    db = database;

    // start server after connecting to mongodb
    app.listen(app.get('port'), function() {
        console.log('[node] app is running on port', app.get('port'));
    });
});


var getOneImage = function (postid, callback) {
    var query = {
        'post_id': postid
    };
    db.collection('beauty.posts')
        .find(query)
        .sort({ display: 1 })
        .limit(1)
        .toArray(function(err, docs) {
            callback(err, docs[0] || {});
        }
    );
};

/*
 * entry for search
 * query
 *  keyword: 長腿
 *  push: 46
 *  type: 神人
 *  limit: 2
 */
app.get('/beauty/search', function(req, res) {
    var query = {
        tag: req.query.tag || '正妹',
        fetched: true,
        push: { $gte: Number(req.query.push) || 1 },
        image_count: { $gte: 1 },
    };
    if (req.query.keyword) {
        query.title = new RegExp(req.query.keyword);
    }
    db.collection('beauty.lists')
        .find(query)
        .sort({ display: 1 })
        .limit(1)
        .toArray(function(err, docs) {
            getOneImage(docs[0]['post_id'], function(err, img){
                res.status(200).json(img);
            });
        }
    );
});

/*
 * entry for handling user feedback
 * body
 *  like: true/false
 *  imgId: target image id
 *  userId: user id
 */
app.post('/beauty/feedback', function(req, res) {
    res.status(200);
});

/*
 * entry for logging
 * body
 *  query
 *  meta: {object} containing user_id, user_ip and timestamp
 */
app.post('/beauty/logging', function(req, res) {
    res.status(200);
});

/*
 * entry for getting trending
 * query
 *  (optional) userId
 */
app.get('/beauty/trending', function(req, res) {
    var data = {
        suggestions: [{
            title: 'Hi',
            push: 100,
            url: 'http://i.imgur.com/IDfkVvc.png'
        },{
            title: 'Hihi',
            push: 50,
            url: 'http://i.imgur.com/EIH9cNu.jpg'
        }]
    };
    res.status(200).json(data);
});


module.exports = app;

