function Markov(req, res, next){
  var arr= res.locals.arr;
  if(arr.length===0) {
    res.end('{"error":"Failed to fetch poem data"}');
    return;
  }

  var 
  seed      = null,
  diclength = 0,
  seedarr   = [],
  vnext     = "",
  dic       = {};
  
  for (var i =0; i<arr.length; i++){
    var innerarr= arr[i].lines;
    for(var j =0; j<innerarr.length; j++){
      var sentence= innerarr[j].replace(/[^a-z\s+]+/gi, '').split(' ');
      sentence[0]= sentence[0].toLowerCase();
      for(var k = 0 ; k<sentence.length-1; k++){
          sentence[k+1]= sentence[k+1].toLowerCase();
          seedarr.push(sentence[k]);
          
          if(vnext!="" && vnext!==sentence[k]){
            if(dic[vnext]){
              dic[vnext].push(sentence[k]);
            }
            else{
              diclength+=1;
              dic[vnext]=[sentence[k]];
            }
          }

          if(dic[sentence[k]] && dic[sentence[k]]!==sentence[k+1]){
            dic[sentence[k]].push(sentence[k+1])
          }
          else{
            if(dic[sentence[k]]!==sentence[k+1]){
              diclength+=1;
              dic[sentence[k]]= [sentence[k+1]];
            }
          }
      }
      vnext = dic[sentence[sentence.length-1]];
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
            seed = seedarr[Math.floor(Math.random()*seedarr.length)];
            break;
          }
          output[i]= output[i].concat((seed+" "));
          count+=1;
          llcount+=1;

          if(count===100) {
            breakall= true;
            break;
          }
          if(llcount==10){
            break;
          }
        }
        else{
          seed = seedarr[Math.floor(Math.random()*seedarr.length)];
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