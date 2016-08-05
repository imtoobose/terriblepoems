function Markov(req, res, next){
  var arr= res.locals.arr;
  if(arr.length===0) {
    res.end('{"error":"Failed to fetch poem data"}');
    return;
  }

  var seed = null,
  diclength=0,
  seedarr=[];

  var dic = {};
  for (var i =0; i<arr.length; i++){
    var innerarr= arr[i].lines;
    for(var j =0; j<innerarr.length; j++){
      var sentence= innerarr[j].replace(/[^a-z0-9\s+]+/gi, '').split(' ');
      for(var k = 0 ; k<sentence.length-1; k++){
          sentence[k]= sentence[k].toLowerCase();
          seedarr.push(sentence[k]);
          if(dic[sentence[k]]){
            dic[sentence[k]].push(sentence[k+1])
          }
          else{
            diclength+=1;
            dic[sentence[k]]= [sentence[k+1]];
          }
      }
      dic[sentence[sentence.length-1]]=[seed];
    }
  }
  var output   = [""],
      count    = 0,
      breakall = false;

  seed = seedarr[Math.floor(Math.random()*seedarr.length)];

  if(seed){
    for(var i=0; ; i++){
      output[i]="";
      var llcount =0;
      for(var j=0; ; j++){
        if(dic[seed]){
          seed = dic[seed][Math.floor(Math.random()*dic[seed].length)];
          if(!dic[seed] || dic[seed].length===0) {
            seed= seedarr[Math.floor(Math.random()*seedarr.length)];
            break;
          }

          output[i]= output[i].concat((seed+" "));
          count+=1;
          llcount+=1;

          if(count===150) {
            breakall= true;
            break;
          }
          if(llcount==10){
            break;
          }

        }
        else{
          seed= seedarr[Math.floor(Math.random()*seedarr.length)];
          break;
        }
      }
      if(breakall){
        break;
      }
    }
  }
  res.locals.output = output;
  next();
}

module.exports = Markov