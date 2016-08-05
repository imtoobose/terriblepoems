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

function allowCORS(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
}

function getDisplay(req, res, next){
  res.jsonp({
    "poem": res.locals.output,
    "author": res.locals.auth
  });
}

app.get('/poem', getAuthor, getLines, Markov, allowCORS, getDisplay);
//app.use(express.static("webpage"));
app.set('views', 'templates');
app.set('view engine', 'pug');
app.get('/', function(req, res){
  res.end("Nothing to see here");
});

app.listen(process.env.PORT||8080);