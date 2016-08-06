'use strict';

var expect = require('chai').expect;
var utils = require('../lib/utils');

describe('#Utils', function(){
    describe('.randomPick()', function(){
        it('should pick 1 from [1]', function(){
            var array = [1];
            expect(utils.randomPick(array)).to.equal(1);
        });
        it('should pick either 1 or 2 from [1, 2]', function(){
            var array = [1, 2];
            expect(utils.randomPick(array)).to.within(1,2);
        });
        it('should return undefined from empty array', function(){
            var array = [];
            expect(utils.randomPick(array)).to.equal(undefined);
        });
        it('should return undefined from unaccepted types', function(){
            var array = {};
            expect(utils.randomPick(array)).to.equal(undefined);
        });
    });
});
