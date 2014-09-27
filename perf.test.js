var Arr = require('./Arr.js');

var n = 1000000;

var a = new Array();

console.time('Native: push');
for (var i=0; i<n; i++) {
  a.push(i);
}
console.timeEnd('Native: push');

a = new Arr();

console.time('Arr: push');
for (var i=0; i<n; i++) {
  a.push(i);
}
console.timeEnd('Arr: push');