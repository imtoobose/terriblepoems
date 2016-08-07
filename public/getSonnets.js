var 
  fs = require('fs'),
  bl = require('bl'),
  path = require('path');

function newMarkov(req,res,next){
  fs.createReadStream(path.join(__dirname,'data','shakesworks.txt'))
  .pipe(bl(function(err, data){
    if(!err){
      createMarkov(data.toString(), res, next);
    }
  }));
}

function createMarkov(fin, res, next){
  var arr= fin.split(' ');
  var dict= {},
  count=0;
  //res.end(fin);
  for(var i in arr){
    arr[i]= arr[i].trim();
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
        if(seed.length<5 && arr[i].length>=5){
          dict[seed].push(arr[i]);
        } 
        seed= arr[i];
      }
      else{
        dict[seed]= [arr[i]];
      }
    }
  }
  res.locals.dict = dict;
  res.locals.auth = "William Shakespeare";
  next();
}

module.exports= newMarkov;