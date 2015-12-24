var username = Scratch.INIT_DATA.LOGGED_IN_USER.model.username;

var numofpages = prompt("How many pages of followers does this user have?"); 
var myFollowers = [];
var page = 1;

function start( e ) {
  $.get( "https://scratch.mit.edu/users/" + username + "/followers/?page=1", loaded ); 
}
function loaded( data ) {
  var $dom = $( data );
  var $users = $dom.find('span.title').children();

  for (var i=0; i<$users.length; i++) {
    var user = $users[i].text.trim();
    myFollowers.push(user); 
  }
  console.log("Done page" + page);
  page++;
  
  if(page < numofpages){

    $.get( "https://scratch.mit.edu/users/" + username + "/followers/?page="+page, loaded ); 
  }
  else{
    postmethod();
  }
};

function postmethod(){

  var start = confirm("Start?");
  console.log(myFollowers);
  if(start == true){
    for (var i = 0; i<myFollowers.length; i++){
      console.log("Running..."); 
      var current = myFollowers[i];
      $.ajax({
          type: "POST",
          url: "https://scratch.mit.edu/site-api/user/followers/" + current + "/add/",
        
      });
      console.log("Sent to user " + current);
    }
    console.log("Done.");
  } 
  else {
    console.log("Canceled.");
  }
};

console.log("Stating...");
start(); 
