var fs = require('fs'),
    bl = require('bl'),
    path= require('path');


function getAuthor(req, res, next){
  fs.createReadStream(path.join(__dirname, 'authorsdb.txt'))
    .pipe(bl(function(err, data){
      if(!err){
        var auths    = data.toString().split(','),
            randauth = (auths[Math.floor(Math.random()*auths.length)]);           
        randauth = randauth.slice(1, randauth.length-1);
        res.locals.auth = randauth;
        next();
      }
      else res.end(JSON.stringify({"error":"Failed to fetch author data"}));
   })).on("error", function(){
      res.end('{"error": "Failed to fetch author data"}');
    });
}

module.exports = getAuthor;