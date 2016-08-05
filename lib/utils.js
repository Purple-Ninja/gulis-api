/* jshint node: true, devel: true */
'use strict';

var Utils = {
    randomPick: function(arr) {
        if(typeof(arr) === 'object' && arr.hasOwnProperty('length')) {
            return arr[Math.floor(Math.random()*arr.length)];
        } else {
            return undefined;
        }
    }
};

module.exports = Utils;