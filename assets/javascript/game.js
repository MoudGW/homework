var authKey = "add977686a8d48c5bbc9c4a71b0d60f8";
var search = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
$("document").ready(function(){
  $("input[name='Number']").click(function(){
    $("input[name='Number']").val('');
  });
  $("#search").click(function(){
    $('#result').html('<p>Top Articles</p>');
    search=$("input[name='search']").val();
    numResults=$("input[name='Number']").val();
    startYear=$("input[name='year']").val()+"0101";
    endYear=$("input[name='endYear']").val()+"0101"; 
    if(endYear==="0101" || startYear==="0101")
    {
      var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey +'&q='+search;
    }
    else{
      var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey +'&q='+search+ "&begin_date="+startYear +'&end_date='+endYear;
    }
    
    $.ajax({
     url: queryURL,
     method: "GET"
   }).done(function(response) {

    var articles=response.response.docs;

    for (var i = 0; i < numResults; i++) 
   {
     $('#result').append("<div id="+i+">"+"<p class='arti'>"+(i+1)+"</p>"+articles[i].headline.main+"</div>");
     $('#'+i).append("<div>"+articles[i].snippet+"</div>");
     $('#'+i).append("<p>Year : "+(articles[i].pub_date).substring(0,4)+"</p>");
     $('#'+i).append("<a href="+articles[i].web_url+">"+articles[i].web_url+"</a>");
   }
 });
 });
  $("#clear").click(function(){
    $("input[type=text]").val('');
    $('#result').html('<p>Top Articles</p>');
  }); 
});