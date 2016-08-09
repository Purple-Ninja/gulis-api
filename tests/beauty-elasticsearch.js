'use strict';

var expect = require('chai').expect;
var Search = require('../lib/search');
var ElasticSearch = require('../lib/elasticsearch');
var sinon = require('sinon');
var request = require('request');
var reqres = require('reqres');

describe('#Search', function(){
    // test buildOptions
    describe('.buildOptions()', function(){
        it('should return url and form', function(){
            expect(Search.buildOptions({}, 'localhost')).to.have.all.keys(['url', 'form']);
        });

        it('should return the options containing size=1 when limit=1', function(){
            var req = {
                query: {
                    limit: 1
                }
            };
            var options = Search.buildOptions(req, 'localhost');
            var form = JSON.parse(options.form);
            expect(form.size).to.equal(1);
        });

        it('should return the options with query=透明系 when keyword=透明系', function(){
            var req = {
                query: {
                    keyword: '透明系'
                }
            };
            var options = Search.buildOptions(req, 'localhost');
            var form = JSON.parse(options.form);
            expect(form.query.bool.must.multi_match.query).to.equal('透明系');
        });
    });

    describe('.source', function(){
        it('should return setUri and getUri', function(){
            expect(ElasticSearch.source).to.have.all.keys(['setUri', 'getUri']);
        });
        it('should get undefined uri before set', function(){
            expect(ElasticSearch.source.getUri()).to.equal(undefined);
        });
        it('should get correct uri after set', function(){
            var uri = 'localhost';
            ElasticSearch.source.setUri(uri);
            expect(ElasticSearch.source.getUri()).to.equal(uri);
        });
    });

    describe('.formatter()', function(){

        var results = {
            hits: {
                hits: [
                    {
                        fields: {
                            title: ['title1'],
                            thumbups: [1],
                            'images.link': [
                                'link1.1',
                                'link1.2'
                            ]
                        }
                    },
                    {
                        fields: {
                            title: ['title2'],
                            thumbups: [2],
                            'images.link': [
                                'link2.1',
                                'link2.2'
                            ]
                        }
                    }
                ]
            }
        };
        var formatted = Search.formatter(results);

        it('should return the same length of search results', function(){
            expect(formatted.length).to.equal(2);
        });

        it('should return formatted search results that contain title, thumbups and images', function(){
            expect(formatted[0]).to.have.all.keys(['title', 'thumbups', 'images']);
        });

        it('should return formatted search results that contain correct content', function(){
            expect(formatted[0].title).to.equal('title1');
            expect(formatted[0].thumbups).to.equal(1);
            expect(formatted[0].images).to.be.oneOf(['link1.1', 'link1.2']);
        });

        it('should return [] when no search results', function(){
            expect(Search.formatter({})).to.eql([]);
        });
    });

    describe('.search()', function(){

        var req;
        var res;
        var mockBody;

        before(function(){
            mockBody = JSON.stringify(require('./mocks/elasticsearch.json'));
        });

        beforeEach(function () {
            req = {
                query: {
                    keyword: '透明系'
                }
            };
            res = reqres.res();
        });

        it('should respond with correct number of results and status', function(){
            res = {
                json: function(results) {
                    expect(results.length).to.equal(3);
                },
                status: function(responseStatus) {
                    expect(responseStatus).to.equal(200);
                    // this makes it chainable
                    return this;
                }
            };
            // stub request.post by calling the callback function
            // with error, reponse and body
            sinon.stub(request, 'post', function(options, cb){
                cb(null, {}, mockBody);
            });
            Search.search(req, res);
        });
    });
});
