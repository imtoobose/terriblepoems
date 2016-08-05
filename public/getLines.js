var request = require('request'),
    bl      = require('bl');
    
function getLines(req, res, next){
  request("http://poetrydb.org/author/"+res.locals.auth+"/lines")
    .pipe(bl(function(err, data){
      if(!err){
        var arr= JSON.parse(data.toString());
        res.locals.arr = arr;
        next();
      }
      else{
        res.end(JSON.stringify({"error":"Failed to fetch poem data"}));
      }
  }));
}

module.exports= getLines;