/*---Requirements----*/
/*---Core modules and dependencies---*/
var 
    request     = require('request'),
    path        = require('path'),
    express     = require('express'),
    app         = new express();

/*---App modules---*/
var
    getAuthor   = require('./public/getAuthor')
    getLines    = require('./public/getLines'),
    getSonnets  = require('./public/getSonnets'),
    getMarkov   = require('./public/newmarkov'),
    createChain = require('./public/createChain');
    
app.get('/shakespeare', getSonnets, createChain); 
app.get('/poem', getAuthor, getLines, getMarkov, createChain);
app.use(express.static("dist"));
app.get('/', function(req, res){
  res.end();
});

app.listen(process.env.PORT||8080);