/*---Requirements----*/
/*---Core modules and dependencies---*/
var 
    request     = require('request'),
    path        = require('path'),
    express     = require('express'),
    favicon     = require('serve-favicon'),
    app         = new express();

/*---App modules---*/
var
    getAuthor   = require('./public/getAuthor'),
    getLines    = require('./public/getLines'),
    getMarkov   = require('./public/newmarkov'),
    createChain = require('./public/createChain');
    
app.use(favicon(path.join(__dirname, 'public','favicon.ico'))); 
app.get('/poem', getAuthor, getLines, getMarkov, createChain);
app.use(express.static("webpage"));
app.get('/', function(req, res){
  res.end();
});

app.listen(process.env.PORT||8080);