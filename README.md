arr
===

JavaScript Array extended


Properties
==========

events
------

length
------

Standard property [@length@](Standart accessor methods supported).


Accessor methods
================

get(index [, defaultValue])
----------------------------

Examples:

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

Standard accessor methods supported:

* [concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* [join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
* [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
* [toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)
* [toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)
* [indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
* [lastIndexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

and [others](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array#Accessor_methods).

Mutator methods
========

set(index, value)
------------------

update(handler)
----------------



Events
======
