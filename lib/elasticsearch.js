/* jshint node: true, devel: true */
'use strict';

var ElasticSearch = {
    /*
     * Returns an object of uri getter/setter
     * @return {object}
     */
    source: (function(){
        // @private {string}
        var _uri;
        var setUri = function(uri) {
            _uri = uri;
        };
        var getUri = function() {
            return _uri;
        };
        return {
            setUri: setUri,
            getUri: getUri
        };
    }()),
};

module.exports = ElasticSearch;