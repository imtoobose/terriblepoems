function getPoem(){
  qwest.setDefaultDataType('json');
  qwest.get("http://localhost:8080/poem?callback=?")
  .then(function(xhr, response){
    var data= JSON.parse(xhr.responseText);
    printData(data);
  })
  .catch(function(e, xhr, response){
    document.getElementById("poem").innerHTML= "Looks like an error occurred :( Try again!";
  })
}

function printData(data){
  document.getElementById("poem").innerHTML="";
  var re = /a|the|an|of/gi;
  for(var i in data.poem){
    if(data.poem[i]=='' || data.poem[i]==" " || (data.poem[i].length==1 && re.test(data.poem[i]))){
      continue;
    }

    else{
      var ss = (data.poem[i].trim().split(""));
      ss[0]  = ss[0].toUpperCase();
      ss.push(",");
      ss     = ss.join("");
      document.getElementById("poem").insertAdjacentHTML( "afterend" ,"<p>" + ss +"</p>");
    }
  }
}

(function(){
  document.getElementById("poem").innerHTML= "Loading";
  if(qwest){
    getPoem();
  }
  else{
    document.getElementById("poem").innerHTML="An error occurred";
  }
}).call(this);