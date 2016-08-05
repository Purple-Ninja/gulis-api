/* jshint node: true, devel: true */
'use strict';

var Utils = {
    randomPick: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }
};

module.exports = Utils;