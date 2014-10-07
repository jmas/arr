(function(rootScope) {
  
  // original Array methods
  var
    arrayPop = Array.prototype.pop,
    arrayPush = Array.prototype.push,
    arrayReverse = Array.prototype.reverse,
    arrayShift = Array.prototype.shift,
    arraySort = Array.prototype.sort,
    arraySplice = Array.prototype.splice,
    arrayUnshift = Array.prototype.unshift;
  
  /**
   * Constructor.
   */
  function Arr() {
    var instance = this;
    
    if (! instance instanceof Arr) {
      instance = new Arr();
    }
        
    if (arguments.length === 1 && typeof arguments[0] === 'number' && arguments[0] % 1 === 0) {
      arrayPush.apply(instance, new Array(arguments[0]));
    } else {
      arrayPush.apply(instance, arguments);
    }
    
    instance.events = {};
    
    return instance;
  };
  
  // Attach prototype
  Arr.prototype = [];
  
  /**
   * Attached events.
   */
  Arr.prototype.events = {};
   
  /**
   * Get value by index.
   */
  Arr.prototype.get = function(index, defaultValue) {
    return typeof this[index] === 'undefined' ? defaultValue: this[index];
  };
   
  /**
   * Attach event handler.
   */
  Arr.prototype.on = function(eventName, handler) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler);

    return this;
  };
  
  /**
   * Remove attached event handler.
   */
  Arr.prototype.off = function(eventName, handler) {
    if (typeof this.events[eventName] === 'undefined') {
      return this;
    }
    
    if (typeof handler === 'undefined') {
      this.events[eventName] = undefined;
      return this;
    }

    for (var i=0,len=this.events[eventName].length; i<len; i++) {
      if (this.events[eventName][i] === handler) {
        this.events[eventName].splice(i, 1);
      }
    }
    
    return this;
  };
   
  /**
   * Trigger event.
   */
  Arr.prototype.trigger = function(eventName, args) {
    args = args || [];

    if (eventName instanceof Array) {
      for (var k=0, klen=eventName.length; k<klen; k++) {
        if (typeof this.events[eventName[k]] === 'undefined') {
          continue;
        }
       
        for (var i=0,len=this.events[eventName[k]].length; i<len; i++) {
          this.events[eventName[k]][i].apply(this, [args]);
        }
      }
    } else {
      for (var i=0,len=this.events[eventName].length; i<len; i++) {
        this.events[eventName][i].apply(this, [args]);
      }
    }

    return this;
  };
   
  /**
   * Update items by handler.
   */
  Arr.prototype.update = function(handler) {
    if (! handler instanceof Function) {
      throw new Error('handler should be an Function');
    }
    
    var oldValue, newValue, i, result = [];
   
    for (i=0,len=this.length; i<len; i++) {
      oldValue = this[i];
      newValue = handler.apply(this, [oldValue, i]);
      
      if (typeof newValue !== 'undefined') {
        this[i] = newValue;
        result.push(newValue);
      }
    }
   
    if (result.length > 0) {
      if (typeof this.events.change !== 'undefined' || typeof this.events.update !== 'undefined') {
        this.trigger(['change', 'update'], {
          type: 'update',
          items: result
        });
      }
    }
   
    return this;
  };
  
  /**
   * Insert array of items.
   */
  Arr.prototype.insert = function(items) {
    if (! items instanceof Array) {
      throw new Error('items should be an Array');
    }
    
    arrayPush.apply(this, items);

    if (typeof this.events.change !== 'undefined' || typeof this.events.insert !== 'undefined') {
      this.trigger(['change', 'insert'], {
        type: 'insert',
        items: items
      });
    }

    return this;
  };
  
  /**
   * Remove items by handler.
   */
  Arr.prototype.remove = function(handler) {
    if (typeof handler === 'undefined') { // drop all items
      if (this.length > 0) {
        this.splice(0, this.length);
      }
      
      return this;
    }
    
    if (! handler instanceof Function) {
      throw new Error('handler should be an Function');
    }
    
    var result = [], stay = [], i;

    for (i=0, len=this.length; i<len; i++) {
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
      if (typeof this.events.change !== 'undefined' || typeof this.events.remove !== 'undefined') {
        this.trigger(['change', 'remove'], {
          type: 'remove',
          items: result
        });
      }
    }
   
    return this;
  };
  
  /**
   * Set value by index.
   */
  Arr.prototype.set = function(index, value) {
    if (! index instanceof Number) {
      throw new Error('index should be an Number');
    }
    
    this[index] = value;

    if (typeof this.events.change !== 'undefined' || typeof this.events.update !== 'undefined') {
      this.trigger(['change', 'update'], {
        type: 'update',
        items: [this[index]]
      });
    }

    return this;
  };
   
  /**
   * Removes the last element from an array and returns that element.
   */
  Arr.prototype.pop = function() {
    var result = arrayPop.apply(this, arguments);

    if (typeof this.events.change !== 'undefined' || typeof this.events.remove !== 'undefined' ) {
      this.trigger(['change', 'remove'], {
        type: 'remove',
        items: [result]
      });
    }

    return result;
  };
   
  /**
   * Adds one or more elements to the end of an array and returns the new length of the array.
   */
  Arr.prototype.push = function() {
    var result = arrayPush.apply(this, arguments);

    if (typeof this.events.change !== 'undefined' || typeof this.events.insert !== 'undefined' ) {
      this.trigger(['change', 'insert'], {
        type: 'insert',
        items: Array.prototype.slice.call(arguments, 0)
      });
    }

    return result;
  };
   
  /**
   * Reverses the order of the elements of an array — the first becomes the last, and the last becomes the first.
   */
  Arr.prototype.reverse = function() {
    var result = arrayReverse.apply(this, arguments);

    if (typeof this.events.change !== 'undefined' || typeof this.events.update !== 'undefined' ) {
      this.trigger(['change', 'update'], {
        type: 'update',
        items: Array.prototype.slice.call(result, 0)
      });
    }

    return result;
  };
   
  /**
   * Removes the first element from an array and returns that element.
   */
  Arr.prototype.shift = function() {
    var result = arrayShift.apply(this, arguments);

    if (typeof this.events.change !== 'undefined' || typeof this.events.remove !== 'undefined' ) {
      this.trigger(['change', 'remove'], {
        type: 'remove',
        items: [result]
      });
    }

    return result;
  };
   
  /**
   * Sorts the elements of an array in place and returns the array.
   */
  Arr.prototype.sort = function() {
    var result = arraySort.apply(this, arguments);

    if (typeof this.events.change !== 'undefined' || typeof this.events.update !== 'undefined' ) {
      this.trigger(['change', 'update'], {
        type: 'update',
        items: Array.prototype.slice.call(result, 0)
      });
    }

    return result;
  };
   
  /**
   * Adds and/or removes elements from an array.
   */
  Arr.prototype.splice = function() {
    var result = arraySplice.apply(this, arguments);

    if (result.length > 0) {
      if (typeof this.events.change !== 'undefined' || typeof this.events.remove !== 'undefined' ) {
        this.trigger(['change', 'remove'], {
          type: 'remove',
          items: Array.prototype.slice.call(result, 0)
        });
      }
    }

    if (arguments.length > 2) {
      if (typeof this.events.change !== 'undefined' || typeof this.events.insert !== 'undefined' ) {
        this.trigger(['change', 'insert'], {
          type: 'insert',
          items: Array.prototype.slice.call(arguments, 2)
        });
      }
    }

    return result;
  };
   
  /**
   * Adds one or more elements to the front of an array and returns the new length of the array.
   */
  Arr.prototype.unshift = function() {
    var result = arrayUnshift.apply(this, arguments);

    if (typeof this.events.change !== 'undefined' || typeof this.events.insert !== 'undefined' ) {
      this.trigger(['change', 'insert'], {
        type: 'insert',
        items: [result]
      });
    }

    return result;
  };
  
  // exports

  if (typeof module !== 'undefined') {
    module.exports = Arr;
  } else {
    rootScope.Arr = Arr;
  }
})(this);
