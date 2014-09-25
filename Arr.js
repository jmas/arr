(function(rootScope) {
  
  var
    arrayPop = Array.prototype.pop,
    arrayPush = Array.prototype.push,
    arrayReverse = Array.prototype.reverse,
    arrayShift = Array.prototype.shift,
    arraySort = Array.prototype.sort,
    arraySplice = Array.prototype.splice,
    arrayUnshift = Array.prototype.unshift;
   
  var Arr = function() {
    arrayPush.apply(this, arguments);
   
    this.events = [];
  };
   
  Arr.prototype = [];
   
  Arr.prototype.events = [];
   
  /**
   *
   */
  Arr.prototype.get = function(index, defaultValue) {
    defaultValue = typeof defaultValue === 'undefined' ? null: defaultValue;
    return typeof this[index] === 'undefined' ? defaultValue: this[index];
  };
   
  /**
   *
   */
  Arr.prototype.on = function(eventName, handler) {
    this.events.push({
      name: eventName,
      handler: handler
    });
   
    return this;
  };
   
  /**
   *
   */
  Arr.prototype.trigger = function(eventName, args) {
    args = args || [];
   
    for (var i=0,len=this.events.length; i<len; i++) {
      if (this.events[i].name == eventName) {
        this.events[i].handler.apply(this, [args]);
      }
    }
   
    return this;
  };
   
  /**
   *
   */
  Arr.prototype.update = function(handler) {
    if (! handler instanceof Function) {
      throw new Error('handler should be an Function');
    }
    
    var oldValue, newValue;
    var result = [];
   
    for (var i=0,len=this.length; i<len; i++) {
      oldValue = this[i];
      newValue = handler.apply(this, [oldValue, i]);
      
      if (typeof newValue !== 'undefined') {
        this[i] = newValue;
        result.push(newValue);
      }
    }
   
    if (result.length > 0) {
      this.trigger('change', {
        type: 'update',
        items: result
      });
    }
   
    return this;
  };
  
  Arr.prototype.insert = function(items) {
    if (! items instanceof Array) {
      throw new Error('items should be an Array');
    }
    
    arrayPush.apply(this, items);
    this.trigger('change', {
      type: 'insert',
      items: items
    });
    return this;
  };
  
  /**
   *
   */
  Arr.prototype.remove = function(handler) {
    if (! handler instanceof Function) {
      throw new Error('handler should be an Function');
    }
    
    var result = [];
    var stay = [];

    for (var i=0, len=this.length; i<len; i++) {
      isRemove = handler.apply(this, [this[i], i]);
      
      if (isRemove === true) {
        result.push(this[i]);
      } else {
        stay.push(this[i]);
      }
    }

    arraySplice.apply(this, [0, this.length]);
    arrayPush.apply(this, stay);

    if (result.length > 0) {
      this.trigger('change', {
        type: 'remove',
        items: result
      });
    }
   
    return this;
  };
  
  /**
   *
   */
  Arr.prototype.set = function(index, value) {
    if (! index instanceof Number) {
      throw new Error('index should be an Number');
    }
    
    this[index] = value;
    this.trigger('change', {
      type: 'update',
      items: [this[index]]
    });
    return this;
  };
   
  /**
   * Removes the last element from an array and returns that element.
   */
  Arr.prototype.pop = function() {
    var result = arrayPop.apply(this, arguments);
    this.trigger('change', {
      type: 'remove',
      items: [result]
    });
    return result;
  };
   
  /**
   * Adds one or more elements to the end of an array and returns the new length of the array.
   */
  Arr.prototype.push = function() {
    var result = arrayPush.apply(this, arguments);
    this.trigger('change', {
      type: 'insert',
      items: Array.prototype.slice.call(arguments, 0)
    });
    return result;
  };
   
  /**
   * Reverses the order of the elements of an array — the first becomes the last, and the last becomes the first.
   */
  Arr.prototype.reverse = function() {
    var result = arrayReverse.apply(this, arguments);
    this.trigger('change', {
      type: 'update',
      items: result.slice(0)
    });
    return result;
  };
   
  /**
   * Removes the first element from an array and returns that element.
   */
  Arr.prototype.shift = function() {
    var result = arrayShift.apply(this, arguments);
    this.trigger('change', {
      type: 'remove',
      items: [result]
    });
    return result;
  };
   
  /**
   * Sorts the elements of an array in place and returns the array.
   */
  Arr.prototype.sort = function() {
    var result = arraySort.apply(this, arguments);
    this.trigger('change', {
      type: 'update',
      items: result
    });
    return result;
  };
   
  /**
   * Adds and/or removes elements from an array.
   */
  Arr.prototype.splice = function() {
    var items = this.slice(arguments[0], arguments[0]+arguments[1]);
    var result = arraySplice.apply(this, arguments);
    this.trigger('change', {
      type: 'remove',
      items: items
    });
    return result;
  };
   
  /**
   * Adds one or more elements to the front of an array and returns the new length of the array.
   */
  Arr.prototype.unshift = function() {
    var result = arrayUnshift.apply(this, arguments);
    this.trigger('change', {
      type: 'insert',
      items: [result]
    });
    return result;
  };

  if (typeof module !== 'undefined') {
    module.exports = Arr;
  } else {
    rootScope.Arr = Arr;
  }
})(this);