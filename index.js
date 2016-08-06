/*---Requirements----*/
/*---Core modules and dependencies---*/
var 
    request     = require('request'),
    express     = require('express'),
    app         = new express();

/*---App modules---*/
var
    getAuthor   = require('./public/getAuthor'),
    getLines    = require('./public/getLines'),
    getMarkov   = require('./public/newmarkov'),
    createChain = require('./public/createChain');

app.get('/poem', getAuthor, getLines, getMarkov, createChain);
app.use(express.static("webpage"));
app.get('/', function(req, res){
  res.end();
});

app.listen(process.env.PORT||8080);