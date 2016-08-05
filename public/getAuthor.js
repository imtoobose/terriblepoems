var fs = require('fs'),
    bl = require('bl');


function getAuthor(req, res, next){
  console.log("getting author");
  fs.createReadStream('./public/authorsdb.txt')
    .pipe(bl(function(err, data){
      if(!err){
        var auths    = data.toString().split(','),
            randauth = (auths[Math.floor(Math.random()*auths.length)]);           
        randauth = randauth.slice(1, randauth.length-1);
        res.locals.auth = randauth;
        console.log(res.locals.auth);
        next();
      }
      else res.end(JSON.stringify({"error":"Failed to fetch author data"}));
   })).on("error", function(){
      res.end('{"error": "Failed to fetch author data"}');
    });
}

module.exports = getAuthor;