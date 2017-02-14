// basketfunc.js
 const rev = require('./hoffy.js');
 function square(x){
   return x*x;
 }
 //console.log(square(4));
//  let mapWithSquare = rev.mapWith(square);
//
// myArr = [1,2,3,4];
// //console.log(myArr.map(square));
// console.log(mapWithSquare([13, 12]));
let s = "foo=bar\nbaz\nquxx=corge";
console.log(rev.simpleINIParse(s));
