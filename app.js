/* jshint node: true, devel: true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*
 * entry for search
 * query
 *  keyword: 長腿
 *  push: 46
 *  type: 神人
 *  limit: 2
 */
app.get('/beauty/search', function(req, res) {
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

// Start server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;

