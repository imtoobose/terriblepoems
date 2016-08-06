function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getPoem(){
  qwest.setDefaultDataType('json');
  qwest.get("./poem")
  .then(function(xhr, response){
    var data= JSON.parse(xhr.responseText);
    printData(data);
  })
  .catch(function(e, xhr, response){
    console.log(e);
    document.getElementById("poem").innerHTML="",
    document.getElementById("poem").innerHTML= "Looks like an error occurred :( Try again!";
  })
}

function printData(data){
  document.getElementById("poem").innerHTML="";
  document.getElementById("header-title").innerHTML= "From the words of <span class='authorname'>"+data.author+"</span>";
  var 
    arr      = data.poem.split(' '),
    breakall = false,
    ss, 
    n;

  for(var i =0; i<arr.length; i++){
    i= +i;
    ss= '';
    for(var j=0; j<= randomInt(5, 10); j++){
      if(j===0 || arr[i]=='i'){
        n= arr[i].split('');
        if(/[a-z]/.test(n[0])){
          try{
            n[0]=n[0].toUpperCase();
          }
          catch(err){
            n[0]=n[0];
          }
        }
        n= n.join('');
        ss+= n+" ";
      }

      else{
        ss+=arr[i]+" ";
      }
      i+=1;
      if(i==arr.length){
        breakall= true;
        break;
      }
    }
    if(ss.length>=4)
      document.getElementById("poem").innerHTML+= "<p class='poemline'><span class='innertext'>" + ss +"</span></p>";
    if(breakall) break;
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

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  var tit= document.getElementById("header-title");

  window.onscroll = function() {
    var upblur= document.getElementById("upblur");
    if(checkVisible(tit)){
      upblur.style.visibility="hidden";
    }
    else{
      upblur.style.visibility="visible";
    }
  };

}).call(this);