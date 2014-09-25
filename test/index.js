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

    it('should insert 4 items', function(){
      a.insert([1, 2, 3, 4]);
      assert.equal(a[0], 1);
      assert.equal(a[2], 2);
      assert.equal(a[4], 4);
      assert.equal(a.length, 5);
    })

    it('should throw change event', function(done){
      a.on('change', function() {
        done();
      });

      a.insert([5, 5]);
    });
  })

  describe('#update()', function(){
    var a = new Arr(1, 2, 3, 4, 5);

    it('array should contain 5 items', function(){
      assert.equal(a.length, 5);
    })

    it('should update all items to 5', function(){
      a.update(function() {
        return 5;
      });

      assert.equal(a[0], 5);
      assert.equal(a[1], 5);
      assert.equal(a[2], 5);
      assert.equal(a[3], 5);
      assert.equal(a[4], 5);
    });

    it('should update to 4 only items with index > 0', function(){
      a.update(function(item, index) {
        if (index > 0) {
          return 4;
        }
      });

      assert.equal(a[0], 5);
      assert.equal(a[1], 4);
      assert.equal(a[2], 4);
      assert.equal(a[3], 4);
      assert.equal(a[4], 4);
    });

    it('should throw change event', function(done){
      a.on('change', function() {
        done();
      });

      a.update(function() {
        return 5;
      });
    });
  });

  describe('#remove()', function(){
    var a = new Arr(1, 2, 3, 4, 5);

    it('array should contain 5 items', function(){
      assert.equal(a.length, 5);
    })

    it('should remove first two items', function(){
      a.remove(function(item, index) {
        if (index < 2) {
          return true;
        }
      });

      assert.equal(a.length, 3);
      assert.equal(a[0], 3);
      assert.equal(a[2], 5);
    })

    it('should throw change event', function(done){
      a.on('change', function() {
        done();
      });

      a.remove(function(item, index) {
        if (index < 1) {
          return true;
        }
      });
    });
  });

})