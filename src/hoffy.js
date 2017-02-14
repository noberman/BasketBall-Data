// hoffy.js
const fs = require('fs');

function prod (...nums){
  if(nums.length === 0){
    return undefined;
  }
  const result = nums.reduce(function(a,b){
    return a+b;
  },0);
  return result;
}
function any (arr, fn){
  const filtered = arr.filter(fn);
  if(filtered.length > 0){
    return true;
  }else{
    return false;
  }
}
function maybe (fn){
  return function(...args){
    const result = args.filter((x) => {
      return (x === undefined || x === null);
    });

    if(result.length === 0){
      return fn(...args);
    }else{
      return undefined;
    }
  };
}
function constrainDecorator (fn, min, max){
  return function(...args){
    const result = fn(...args);
    if(result < min){
      return min;
    }else if(result > max){
      return max;
    }else {
      return result;
    }
  };
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
  };
}
function mapWith(fn){
  return function (...args){
    return args[0].map(fn);
  };
}
function simpleINIParse(s){
  const obj = {};
  const allArr = s.split("\n");
  //console.log(allArr);
  allArr.map(function(x){
      // console.log(x);
      // console.log(x.split("=").length);
      // console.log(x.length + "\n");
      if(x.split("=") !== x){
        const elementsArr = x.split("=");
        // console.log(elementsArr[0] !== undefined);
        // console.log(elementsArr[1] !== undefined);
        if(elementsArr[0] !== undefined && elementsArr[1] !== undefined){
          const propertyName = elementsArr[0];

          const property = elementsArr[1];
          //console.log(property);
          //let arr = JSON.parse(property);
          //console.log(arr);

          obj[propertyName] = property;

        }
      }
  });
  return obj;
}
function readFileWith(fn){
  return function(fileName,cBack ){
    fs.readFile(fileName, 'utf8', function(err,data){
      if(err){
        cBack({},undefined);
      }else{
        cBack(err,fn(data));
      }
    });
  };
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
};
