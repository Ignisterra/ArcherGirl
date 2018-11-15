/****************** LEADER BOARD ********************/

//envoi score et vérif

 function sendScore(){

	var score = $('#inputTest').val();
	var name = $('#inputName').val();
	var pos = $('#idlist').val();  
	var tab = [];
	var player = {
			Pos : pos,
		    Name: name,
		    Score: score,		  
			};
	 firebase.database().ref('leaderBoard/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          tab[item.Pos] = item;
        });
        console.log(tab);
      });         
	 for (var i = tab.length, i >=0, i--){
	 	if (score > tab[i].Score){
	 		tab[i] = player;
		 		
			}
	 	}

	 	int i, j;
	   for (i = 1; i < taille; ++i) {
	       int elem = tab[i];
	       for (j = i; j > 0 && tab[j-1] > elem; j--)
	           tab[j] = tab[j-1];
	       tab[j] = elem;
	   }
	/*var list = checkList();*/
	firebase.database().ref('/leaderBoard/' + pos).set({
			Pos : pos,
		    Name: name,
		    Score: score,		  
	});
	/*window.location.replace("leader_board.html");*/
}

// Affichage Leader Board 
async function showList(){
   
        firebase.database().ref('leaderBoard/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot, i) {
          var item = childSnapshot.val();
          $('#lead').append('<li class="item">pos :'+(item.Pos+1)+' Nom : '+item.Name+'<span> Score : '+item.Score+'</span></li>');;
        });
      });         
}


/* $('#lead').append('<li class="item">Nom : '+item.Name+'<span> Score : '+item.Score+'</span></li>');

/************* Authentification et controleur ****************/


//authentification en anonyme
function authAnonymous(){

	firebase.auth().signInAnonymously().catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
}

// Controlleur
function initApp() {

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	  }
	  showList();
	});
	$('#buttonTest').on('click',sendScore);
}

$(function() {
	authAnonymous();
    initApp();
});