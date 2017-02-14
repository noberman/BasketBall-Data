const fs = require('fs');
const rev = require('./basketfunc.js');

fs.readFile('tests/0021600681_gamedetail.json','utf8', function(err,data){
  if(err){
    console.log('There is an error');
  }else{
    let obj = {};
    obj = JSON.parse(data);
    console.log(rev.processGameData(obj));
  }
});
