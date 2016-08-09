/* jshint node: true, devel: true */
'use strict';

var Trending = {

    hot: function(req, res) {
        var results = [];
        res.status(200).json(results);
    }
};

module.exports = Trending;