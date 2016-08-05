## Terrible Poems

Generates a random poem from rudimentary Markov chains. 

* The data is taken from [PoetryDB](poetrydb.org), hosted on Github at [Poetry DB Github](https://github.com/thundercomb/poetrydb)
* To use this as an API go to this app's [Mashape Page](https://market.mashape.com/imtoobose/really-awful-poems) for a request link.
* Using the **/poem** route, you will recieve a JSONP response which contains the poet's name as well as the generated poem in form of an array of lines. This array is not well formatted and the user should take care to omit empty lines.

Example use with JQuery: 

```javascript
$.ajax({
    url: "https://imtoobose-really-awful-poems-v1.p.mashape.com/poem",
    type: 'GET', // The HTTP Method
    datatype: 'json',
    success: function(data) { alert(JSON.stringify(data)); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "YOUR-MASHAPE-KEY"); // Enter here your Mashape key
    }
});
```

### Dependencies:

 * [bl](https://github.com/rvagg/bl) for Buffer drains
 * [request](https://github.com/request/request) for HTTP calls
 * [express.js](https://expressjs.com/) for the back end