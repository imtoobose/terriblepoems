module.exports = function(req, res, next){
  var 
    dict     = res.locals.dict,
    seed     = null,
    initseed = null;

  for(var i in dict){
    if(i==' '|| i==' '|| dict[i].length<=2){
      continue;
    }

    seed     = i,
    initseed = i;
    break;
  }

  if(seed){
    var 
      max  = 300,
      sent = '';

    for(i=0; i<max; i++){
      if(!dict[seed]|| dict[seed].length===0)
        seed = initseed;
      else{
        var 
          ss   = dict[seed],
          rand = ss[Math.floor(Math.random()*ss.length)];
        sent+= rand+' ';
        seed= rand;
      }
    }
    res.jsonp(
    {
      "poem": sent,
      "author": res.locals.auth
    });
  }
  res.end('{error": "invalid API fetch"}');
}