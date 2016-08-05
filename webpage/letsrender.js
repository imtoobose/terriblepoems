function getPoem(){
  $(".poem").html("Loading");

  $.getJSON('http://localhost:8080/poem?callback=?', function(data){
    $(".poem").html("");
    for(var i in data.poem){
      if(data.poem[i]=='' || data.poem[i]==" "){
        continue;
      }
      else{
        var ss = (data.poem[i].trim().split(""));
        ss[0]  = ss[0].toUpperCase();
        ss.push(",");
        ss     = ss.join("");
        $(".poem").append("<p>" + ss +"</p>");
      }
    }
  });
}

getPoem();