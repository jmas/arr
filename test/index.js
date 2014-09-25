var Arr = require('../Arr.js');
var assert = require("assert")

describe('Arr', function(){
  describe('#insert()', function(){
    var a = new Arr;

    it('array should be empty', function(){
      assert.equal(a.length, 0);
    })

    it('should insert one item', function(){
      a.insert([1]);
      assert.equal(a[0], 1);
    })
  })
})