## Terrible Poems

Generates a random poem from rudimentary Markov chains. 

* Shakespeare's sonnets and poems are used as a source for data found on the **/shakespeare** path. This gives a far better result than the random poems due to the much larger data set. Check it out on the heroku page linked in the description.
* The random poet data is taken from [PoetryDB](poetrydb.org), hosted on Github at [Poetry DB Github](https://github.com/thundercomb/poetrydb)
* Using the **/poem** or **/shakespeare** route, you will recieve a JSONP response which contains the poet's name as well as the generated poem in form of a large string.
* To use this as an API go to this app's [Mashape Page](https://market.mashape.com/imtoobose/really-awful-poems) for a request link.

Example use with JQuery: 

```javascript
$.ajax({
    url: "https://imtoobose-really-awful-poems-v1.p.mashape.com/shakespeare",
    type: 'GET',
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