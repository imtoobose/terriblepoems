/*---Requirements----*/
var request     = require('request'),
    express     = require('express'),
    app         = new express(),
    url         = require('url'),
    bl          = require('bl'),
    fs          = require('fs');

/*---fetch random author name---*/
function getAuthor(req, res, next){
  fs.createReadStream('authorsdb.txt')
    .pipe(bl(function(err, data){
      if(!err){
        var auths    = data.toString().split(','),
            randauth = (auths[Math.floor(Math.random()*auths.length)]);           
        randauth = randauth.slice(1, randauth.length-1);
        res.locals.auth = randauth;
        next();
      }
      else res.end({"error":"Failed to fetch author data"});
   }));
}

/*---fetch lines for author's poems---*/
function getLines(req, res, next){
  request("http://poetrydb.org/author/"+res.locals.auth+"/lines")
    .pipe(bl(function(err, data){
      if(!err){
        var arr= JSON.parse(data.toString());
        for(var i = 0; i<arr.length; i++){
          var pp = arr[i];
          if (i===0) console.log(pp);
        }
        res.end("WOOO");
      }
      else{
        res.end({"error":"Failed to fetch lyric data"});
      }
  }));
}

app.get('/poem', getAuthor, getLines);

app.listen(8080, function(){
  console.log("Server started");
});