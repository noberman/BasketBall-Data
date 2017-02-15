const fs = require('fs');
const rev = require('./basketfunc.js');
const request = require('request');

// fs.readFile('tests/0021600681_gamedetail.json','utf8', function(err,data){
//   if(err){
//     console.log('There is an error');
//   }else{
//     let obj = {};
//     obj = JSON.parse(data);
//     console.log(rev.processGameData(obj));
//   }
// });

// request('https://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/0021600680_gamedetail.json', function (err, response, body) {
//   if ((!err) && response.statusCode == 200) {
//     let obj = {};
//     obj = JSON.parse(body);
//     console.log(rev.processGameData(obj));
//     // console.log(obj.g.nextgid);
//     let newURL = 'https://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/' +  obj.g.nextgid + '_gamedetail.json';
//     request_new_url(newURL);
//     // while(obj.g.nextgid !== undefined){
//     //   let newURL = 'https://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/' +  obj.g.nextgid + '_gamedetail.json';
//     //   //console.log(newURL);
//     //   request(newURL, function (err, response, body) {
//     //     if ((!err) && response.statusCode == 200) {
//     //       let obj = {};
//     //       obj = JSON.parse(body);
//     //       console.log(rev.processGameData(obj));
//     //     }
//     //   });
//     // }
//   }
// });

function game_data(url) {
  request(url, function (err, response, body) {
    if ((!err) && response.statusCode == 200) {
      let obj = {};
      obj = JSON.parse(body);
      console.log(rev.processGameData(obj));

      if (obj.g.nextgid) {
          let newURL = 'https://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/' +  obj.g.nextgid + '_gamedetail.json';
          game_data(newURL);
      }
    }
  });
}

game_data('https://foureyes.github.io/csci-ua.0480-spring2017-008/homework/02/0021600680_gamedetail.json');
