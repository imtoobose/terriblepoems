/*---Requirements----*/
/*---Core modules and dependencies---*/
var 
    request     = require('request'),
    express     = require('express'),
    app         = new express();

/*---App modules---*/
var
    Markov      = require('./public/markov'),
    getAuthor   = require('./public/getAuthor'),
    getLines    = require('./public/getLines');

function getDisplay(req, res, next){
  res.jsonp({
    "poem": res.locals.output,
    "author": res.locals.auth
  });
}

app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
  next();
});
app.get('/poem', getAuthor, getLines, Markov, getDisplay);
//app.use(express.static("webpage"));
app.get('/', function(req, res){
  res.end("Nothing to see here");
});

app.listen(process.env.PORT||8080);