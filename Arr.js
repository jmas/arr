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
Arr.prototype.findOne = function(handler) {
  for (var i=0,len=this.length; i<len; i++) {
    if (handler.apply(this, [this[i], i]) === true) {
      return this[i];
    }
  }
 
  return null;
};
 
/**
 *
 */
Arr.prototype.findAll = function(handler) {
  var items = [];
 
  for (var i=0,len=this.length; i<len; i++) {
    if (handler.apply(this, [this[i], i]) === true) {
      items.push(this[i]);
    }
  }
 
  return items;
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
  var oldValue, newValue;
  var result = [];
 
  for (var i=0,len=this.length; i<len; i++) {
    oldValue = this[i];
    newValue = handler.apply(this, [oldValue, i]);
    
    if (typeof newValue !== 'undefined') {
      this[i] = newValue;
      result.push({
        index: i,
        oldValue: oldValue,
        newValue: newValue
      });
    }
  }
 
  if (result.length > 0) {
    this.trigger('change', {
      type: 'update',
      result: result,
      args: arguments
    });
  }
 
  return this;
};
 
/**
 *
 */
Arr.prototype.set = function(index, value) {
  this[index] = value;
  this.trigger('change', {
    type: 'set',
    result: value,
    args: arguments
  });
  return this;
};
 
/**
 * Removes the last element from an array and returns that element.
 */
Arr.prototype.pop = function() {
  var result = arrayPop.apply(this, arguments);
  this.trigger('change', {
    type: 'pop',
    result: result,
    args: arguments
  });
  return result;
};
 
/**
 * Adds one or more elements to the end of an array and returns the new length of the array.
 */
Arr.prototype.push = function() {
  var result = arrayPush.apply(this, arguments);
  this.trigger('change', {
    type: 'push',
    result: result,
    args: arguments
  });
  return result;
};
 
/**
 * Reverses the order of the elements of an array — the first becomes the last, and the last becomes the first.
 */
Arr.prototype.reverse = function() {
  var result = arrayReverse.apply(this, arguments);
  this.trigger('change', {
    type: 'reverse',
    result: result,
    args: arguments
  });
  return result;
};
 
/**
 * Removes the first element from an array and returns that element.
 */
Arr.prototype.shift = function() {
  var result = arrayShift.apply(this, arguments);
  this.trigger('change', {
    type: 'shift',
    result: result,
    args: arguments
  });
  return result;
};
 
/**
 * Sorts the elements of an array in place and returns the array.
 */
Arr.prototype.sort = function() {
  var result = arraySort.apply(this, arguments);
  this.trigger('change', {
    type: 'sort',
    result: result,
    args: arguments
  });
  return result;
};
 
/**
 * Adds and/or removes elements from an array.
 */
Arr.prototype.splice = function() {
  var result = arraySplice.apply(this, arguments);
  this.trigger('change', {
    type: 'splice',
    result: result,
    args: arguments
  });
  return result;
};
 
/**
 * Adds one or more elements to the front of an array and returns the new length of the array.
 */
Arr.prototype.unshift = function() {
  var result = arrayUnshift.apply(this, arguments);
  this.trigger('change', {
    type: 'unshift',
    result: result,
    args: arguments
  });
  return result;
};

module.exports = Arr;