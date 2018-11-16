/****************** LEADER BOARD ********************/

//envoi score et vérif

async function sendScore(){
	var score = $('#inputTest').val();
	var name = $('#inputName').val();
	var pos = 0;  
	var tab = [];
	await firebase.database().ref('leaderBoard/').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      console.log(item);
      /*var setTab = {
      	Pos : item.Pos,
		    Name: item.Name,
		    Score: item.Score,
		  }*/
      tab[item.Pos-1] = item;
    });
  console.log(tab);
  });
  var tablength = tab.length;
  //si il n'y a aucun score
	if (tablength == 0) {
		pos = 1;
		await firebase.database().ref('/leaderBoard/' + pos).set({
				Pos : 1,
			  Name: name,
			  Score: score,	
		});
	window.location.replace("leader_board.html");
	return;
	}
	// si score inférieur au 10eme
	var lowScore = parseInt(tab[tablength-1].Score);
	if(lowScore > score && tablength >= 9){
		tab=[];
	  window.location.replace("leader_board.html");
  	return;
  // si nouveau score inférieir mais moins de 10 score	
  }else if(lowScore > score){
  	var player = {
			Pos : tablength,
	    Name: name,
	    Score: score		  
		};
		tab[tablength] = player;
			pos = tablength + 1;
			console.log(pos);
	 		await firebase.database().ref('/leaderBoard/' + pos).set({
				Pos : pos,
		    Name: name,
		    Score: score	  
			});
	// nouveau score dans le leaderboard		
  }else{
  	console.log(tablength);
  	var player = {
			Pos : tablength + 1,
	    Name: name,
	    Score: score		  
		};
		tab[tablength] = player;
		console.log('new score');
		var j = tablength - 1;
		for(var i= tablength ; i>0; i--){ 
			console.log('i ' + i );
      	var scoreJ = parseInt(tab[j].Score);
      	var scoreI = parseInt(tab[i].Score);
      	console.log('j ' + j);
      	console.log('scoreJ ' + scoreJ);
      	console.log('scoreI ' + scoreI);
        if( scoreJ < scoreI ){
        	console.log(tab);
        	tab[j].Pos += 1;
        	tab[i].Pos -= 1;
          var temp = tab[j];
          tab[j]=tab[i];
          tab[i]=temp;
        }
      j--;
    }
    console.log('ici');
		for (var i = 0; i <= tablength; i++){
			pos += 1;
			console.log(pos);
	 		await firebase.database().ref('/leaderBoard/' + pos).set({
					Pos : tab[i].Pos,
			    Name: tab[i].Name,
			    Score: tab[i].Score,		  
			});
	 	}
  }

  tab = [];
  window.location.replace("leader_board.html");         
}

// Affichage Leader Board 
async function showList(){
	$('#lead').html('');
  await firebase.database().ref('leaderBoard/').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot, i) {
      var item = childSnapshot.val();
      $('#lead').append(
      	'<li class="item">'+
      		'<span>#' +(item.Pos)+ '</span>'+
      		'<span> Nom : '+item.Name+ '</span>'+
      		'<span> Score : '+item.Score+ '</span></li>');
    });
  });         
}


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