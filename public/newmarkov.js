function newMarkov(req,res,next){
  res.locals.dict= cleanup(res.locals.arr, res, next, createMarkov);
}

function cleanup(arr, res, next, callback){
  var count =0;
  var fin = '';
  for(var i in arr){
    var vals = arr[i].lines;
    for(var j in vals){
      if(vals[j]==''|| vals[j]==' ') {
        continue;
      }
      else{
        var sent= vals[j].replace(/\.|'|"|\?|:|\!|,|;|\(|\)/g, '').replace(/-/g, ' ').trim().toLowerCase();
        fin+= sent+' ';
      }
    }
    count+=1;
  }
  callback(fin, res, next);
}

function createMarkov(fin, res, next){
  var arr= fin.split(' ');
  var dict= {},
  count=0;

  for(var i in arr){
    if(arr[i]==' '|| arr[i]=='')
      continue;

    if(count===0) {
      count=1;
      var seed= arr[i];
      continue;
    }

    else{
      if(dict[seed]){
        dict[seed].push(arr[i]);
        seed= arr[i];
      }
      else{
        dict[seed]= [arr[i]];
      }
    }
  }
  res.locals.dict= dict;
  next();
}

module.exports= newMarkov;