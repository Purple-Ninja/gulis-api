/* jshint node: true, devel: true */
'use strict';

var Logging = {

    feedback: function(req, res) {
        res.status(200).end();
    },

    querylog: function(req, res) {
        res.status(200).end();
    }
};

module.exports = Logging;