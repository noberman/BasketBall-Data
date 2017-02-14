// hoffy.js
const fs = require('fs');

function prod (...nums){
  if(nums.length === 0){
    return undefined;
  }
  let result = nums.reduce(function(a,b){
    return a+b;
  },0);
  return result;
}
function any (arr, fn){
  let filtered = arr.filter(fn);
  if(filtered.length > 0){
    return true;
  }else{
    return false;
  }
}
function maybe (fn){
  return function(...args){
    let result = args.filter((x) => {
      return (x === undefined || x === null)
    });

    if(result.length === 0){
      return fn(...args);
    }else{
      return undefined;
    }
  }
}
function constrainDecorator (fn, min, max){
  return function(...args){
    let result = fn(...args);
    if(result < min){
      return min;
    }else if(result > max){
      return max;
    }else return result;
  }
}
function limitCallsDecorator(fn, n){
  let counter = 0;
  return function(...args){
    counter++;
    if(counter > n){
      return undefined;
    }else{
      return fn(...args);
    }
  }
}
function mapWith(fn){
  return function (...args){
    return args[0].map(fn);
  }
}
function simpleINIParse(s){
  let obj = {};
  let allArr = s.split("\n");
  //console.log(allArr);
  let result = allArr.map(function(x){
      let propertyName, proerty;
      // console.log(x);
      // console.log(x.split("=").length);
      // console.log(x.length + "\n");
      if(x.split("=") !== x){
        let elementsArr = x.split("=");
        // console.log(elementsArr[0] !== undefined);
        // console.log(elementsArr[1] !== undefined);
        if(elementsArr[0] !== undefined && elementsArr[1] !== undefined){
          let propertyName = elementsArr[0];
          //console.log(propertyName);
          let property = elementsArr[1];
          obj[propertyName] = property;
        }
      }
  });
  return obj;
}
function readFileWith(fn){

}

module.exports = {
  prod: prod,
  any: any,
  maybe: maybe,
  constrainDecorator: constrainDecorator,
  limitCallsDecorator: limitCallsDecorator,
  mapWith: mapWith,
  simpleINIParse: simpleINIParse,
  readFileWith: readFileWith
}
