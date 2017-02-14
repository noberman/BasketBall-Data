// basketfunc.js
 const rev = require('./hoffy.js');

 function processGameData(obj){
   let string  = "";
   let g = obj.g;
   // gameID and Data/Time
   const id = g.gid;
   const time = g.gdte;
   string += "Game ID: ";
   string += id + ", ";
   string += time + " \n======\n";

   // Final Score
   let scoreT1 = 0;
   let scoreT2 = 0;
   const team1 = g.hls.pstsg;
   const team2 = g.vls.pstsg;
   team1.map(function(x){
     scoreT1 += x.ftm;
     scoreT1 += x.tpm*3;
     scoreT1 += (x.fgm- x.tpm)*2;
   });
   team2.map(function(x){
     scoreT2 += x.ftm;
     scoreT2 += x.tpm*3;
     scoreT2 += (x.fgm- x.tpm)*2;
   });
   const teamName1 = g.hls.tc + " " + g.hls.tn;
   const teamName2 = g.vls.tc + " " + g.vls.tc;
   string += teamName1 + "-" + scoreT1 + "\n";
   string += teamName2 + "-" + scoreT2 + "\n";

   // Player with the most Rebounds
   const allPlayerArr = team1.concat(team2);
   //console.log(allPlayerArr);
   let playerMostRebounds = {};
   let reboundArr = [];
   allPlayerArr.forEach(function(x){
     let playerRebounds = x.oreb + x.dreb;
     reboundArr.push(playerRebounds);
   });
   //console.log(reboundArr);
   let mostRebounds = reboundArr.reduce(function(a,b){
     return Math.max(a, b);
   });
   playerMostRebounds.rebounds = mostRebounds;
   let playerName = allPlayerArr.map(function(x){
     let numberOfRebounds = x.oreb + x.dreb;
     if(numberOfRebounds === playerMostRebounds.rebounds){
       name = x.fn + " " + x.ln;
       playerMostRebounds.name = name;
     }
   });
   string += "* Most Rebounds : " + playerMostRebounds.name + " with " + playerMostRebounds.rebounds + "\n";
   // Player with the highest three pointer percentage that took attempted Least 5 three pointers
   let playerHighestThree = {};
   let tpArr = []
   allPlayerArr.forEach(function(x){
     if(x.tpa > 5){
       let tpp = x.tpm/x.tpa;
       tpArr.push(tpp);
     }
   });
   let highestTpp = tpArr.reduce(function(a,b){
     return Math.max(a,b);
   });
   playerHighestThree.tpp = highestTpp;
   allPlayerArr.map(function(x){
     let tpp = x.tpm/x.tpa;
     if(tpp === playerHighestThree.tpp){
       name = x.fn + " " + x.ln;
       playerHighestThree.name = name;
     }
   });
   string += "* Player with highest 3 point percentage that took at least 5 shots: " + playerHighestThree.name + " at " + playerHighestThree.tpp*100 + "% \n";
   let countBlockers = 0;
   allPlayerArr.map(function(x){
     //console.log(x.blk);
     if(x.blk >= 1){
       countBlockers++;
     }
   });
   string += "* There were " + countBlockers + " players that had at least one block";
   //Players with more turnovers that Assists
   const teamName1Turnover = g.hls.tc + " - " + g.hls.tn;
   const teamName2Turnover = g.vls.tc + " - " + g.vls.tn;
   string += "* Player with the more turnovers than assists: \n"
   string += "        " + teamName1Turnover + "\n"
   team1.filter(function(x){
     if(x.ast < x.tov ){
       string += "        " + "* "+ x.fn + " " + x.ln + "has an assist to turnover ratio of " + x.ast + ":" + x.tov + "\n";
     }
   });
   string += "        " +  teamName2Turnover + "\n"
   team2.filter(function(x){
     if(x.ast < x.tov ){
       string += "        " +  "* "+ x.fn + " " + x.ln + "has an assist to turnover ratio of " + x.ast + ":" + x.tov + "\n";
     }
   });
   //Return one whole string as a report
   return string;
 };

module.exports = {
  processGameData: processGameData
}
