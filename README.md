arr
===

JavaScript Array extended.


Properties
==========

events
------

List of Attached Events.

```javascript
var fruits = new Arr('apple', 'orange', 'pineapple');

fruits.on('change', function() {
  console.log('fruits list is changed.');
});

// fruits.events
// [{
//  "name": "change",
//  "handler": function() { ... }
// }]

fruits.push('mango');
// fruits list is changed.
// fruits
// ['apple', 'orange', 'pineapple', 'mango']
```

length
------

Standard property [```length```](Standart accessor methods supported).


Accessor methods
================

get(index [, defaultValue])
----------------------------

Example:
```javascript
var fruits = new Arr('apple', 'orange', 'pineapple');

fruits.get(0);
// apple

fruits.get(10, 'lime'); // trying to get undefined element - return defaultValue
// lime

fruits.get(20); // trying to get undefined element
// null
```

findOne(handler)
-----------------

findAll(handler)
-----------------

Standard accessor methods supported
-----------------------------------

* [concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) Returns a new array comprised of this array joined with other array(s) and/or value(s).
* [join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) Joins all elements of an array into a string.
* [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) Extracts a section of an array and returns a new array.
* [toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) Returns a string representing the array and its elements. Overrides the ```Object.prototype.toString()``` method.
* [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString) Returns a localized string representing the array and its elements. Overrides the ```Object.prototype.toLocaleString()``` method.
* [indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
* [lastIndexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.

and [others](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array#Accessor_methods).

Mutator methods
===============

set(index, value)
-----------------

Example:
```javascript
var fruits = new Arr('apple', 'orange', 'pineapple');

fruits.set(0, 'banana');
// ['banana', 'orange', 'pineapple']

fruits.get(1, 'lime');
// ['banana', 'lime', 'pineapple']

fruits.get(3, 'nut');
// ['banana', 'lime', 'pineapple', 'nut']
```

update(handler)
----------------

Standard mutator methods supported
----------------------------------

Each mutator method throw event ```change```. How? You can read in section Events.

* [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) Removes the last element from an array and returns that element.
* [push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) Adds one or more elements to the end of an array and returns the new length of the array.
* [reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) Reverses the order of the elements of an array — the first becomes the last, and the last becomes the first.
* [shift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) Removes the first element from an array and returns that element.
* [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) Sorts the elements of an array in place and returns the array.
* [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) Adds and/or removes elements from an array.
* [unshift()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) Adds one or more elements to the front of an array and returns the new length of the array.

and [others](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array#Mutator_methods).

Events
======

