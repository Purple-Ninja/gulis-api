/* jshint node: true, devel: true */
'use strict';

var request = require('request');
var _get = require('lodash/get');
var _merge = require('lodash/merge');
var utils = require('./utils');
var ElasticSearch = require('./elasticsearch');

var Search = {
    /*
     * Returns an object of request options
     * @param {object} req
     * @return {object}
     */
    buildOptions: function(req, url) {
        var searchQuery = {};
        var query = {
          'size': _get(req, 'query.limit', 3),
          'fields': [
             'title',
             'thumbups',
             'images.link'
          ]
        };
        // use keyword search if keyword is specified in the request
        if (req.query && req.query.keyword) {
            searchQuery = {
              'query': {
                 'bool': {
                    'must': {
                       'multi_match': {
                          'query': _get(req, 'query.keyword', '清新 自然 氣質'),
                          'fields': [
                             'title',
                             'content',
                             'pushes'
                          ]
                       }
                    },
                    'filter': {
                       'range': {
                          'thumbups': {
                             'gte': Number(_get(req, 'query.push', 25))
                          }
                       }
                    },
                    'should': {
                       'range': {
                          'article_time': {
                             'gte': 'now-6m/d',
                             'boost': 2
                          }
                       }
                    }
                 }
              }
            };
            query = _merge(query, searchQuery);
        }
        var options = {
            url: url,
            form: JSON.stringify(query)
        };
        return options;
    },

    /* 
     * Returns formatted search results, i.e., array of objects,
     * by giving the response body from elastic search API
     * @param {object} results
     * @return {object}
     */
    formatter: function(results) {
        // TODO: build a better adapter to format returned data
        return _get(results, 'hits.hits', [])
            .map(function(obj) {
                return {
                    title: _get(obj, 'fields.title.0'),
                    thumbups: _get(obj, 'fields.thumbups.0'),
                    // randomly pick an image from response
                    images: utils.randomPick(_get(obj, ['fields', 'images.link']), [])
                };
            });
    },

    /* 
     * Returns formatted search results, i.e., array of objects,
     * by giving the response body from elastic search API
     * @param {object} results
     * @return {object}
     */
    search: function(req, res) {

        var url = ElasticSearch.source.getUri();

        // get the options for elastic search
        var options = Search.buildOptions(req, url);

        // manipulate the results and respond in json format
        var resultsHandler = function(error, response, body) {
            var results = Search.formatter(JSON.parse(body));
            return res.status(200).json(results);
        };

        // make a request to the elastic seach api
        request.post(options, resultsHandler);
    }
};

module.exports = Search;
