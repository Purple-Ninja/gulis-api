/* jshint node: true, devel: true */
'use strict';

module.exports = function(db) {
    var factory = {};

    // get one image from beauty.posts by giving post_id
    factory.getOneImage = function (postid, callback) {
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

    factory.search = function(req, res) {
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
                if (docs[0] && docs[0]['post_id']) {
                    factory.getOneImage(docs[0]['post_id'], function(err, img){
                        res.status(200).json({post: docs[0], image: img});
                    });
                } else {
                    // fallback to random pick
                        res.status(200).json({post: {}, image: {}});
                }
        });
    };

    factory.feedback = function(req, res) {
        res.status(200).end();
    };


    factory.feedback = function(req, res) {
        res.status(200).end();
    };

    factory.logging = function(req, res) {
        var userLog = {
            user: req.body.user,
            raw: req.body.raw,
            date: new Date()
        };
        if (req.body.meta) {
            userLog.meta = req.body.meta || {};
        }
        db.collection('beauty.query')
            .insertOne(userLog, function(err, res) {
                res.status(200).json({message: err || 'success'});
            }
        );
    };

    factory.trending = function(req, res) {
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
    };

    return factory;
};
