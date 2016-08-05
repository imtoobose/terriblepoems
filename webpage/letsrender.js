function getPoem(){
  qwest.setDefaultDataType('json');
  qwest.get("https://really-awful-poems.herokuapp.com/poem")
  .then(function(xhr, response){
    var data= JSON.parse(xhr.responseText);
    printData(data);
  })
  .catch(function(e, xhr, response){
    document.getElementById("poem").innerHTML="",
    document.getElementById("poem").innerHTML= "Looks like an error occurred :( Try again!";
  })
}

function printData(data){
  document.getElementById("poem").innerHTML="";
  var ol = "";
  for(var i in data.poem){
    data.poem[i]= data.poem[i].trim();
    if(data.poem[i]=='' || data.poem[i]==" " || data.poem[i] == "the"|| data.poem[i]=="a" || data.poem[i]=="an"){
      continue;
    }

    else{
      if(data.poem[i].split(" ").length==1){
        ol = data.poem[i];
        continue;
      }
      else{
        ol = "";
      }

      var ss = (data.poem[i].split(""));
      ss[0]  = ss[0].toUpperCase();
      if(i!==data.poem.length)
        ss.push(",");
      else
        ss.push(".");
      ss = ss.join("");
      if(ol!=="" && ss.indexOf(ol)==-1){
        ss = ol.concat(ss);
      }
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