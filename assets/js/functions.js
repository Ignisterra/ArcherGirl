/**
*
* https://gamedevacademy.org/creating-mobile-games-with-phaser-3-and-cordova/
* Resize function only if it keeps the aspect ratio (based on width)
* No parameter,
* Return nothing,
* @example
* resize();
*
*/

function resize() {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;
 
    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

/**
* 
* Fonction pour se déplacer de fenêtre en fenêtre dans le background contenant 6 fenêtres (3 lignes * 2 colonnes)
* [] [] Niveau 2
* [] [] Niveau 1
* [] [] Niveau 0
* @example
* moveToWindow(player, "down");
*
*/

function moveToWindow(player, direction){

    /**
    * 
    * @param {object} player Un objet sprite à appartenant à Phaser.scene possédant des propriétés x, y pour obtenir et définir sa position
    * @param {string} direction Un string pouvant contenir "right", "left", "down", "up" selon la direction vers laquelle veut se diriger le personnage.
    *
    */

    //On va a droite de la fenetre à gauche au niveau 2
    if(player.x == 330 && player.y == 140 && direction == "right"){
        player.x =  515;
    }
    //On va à gauche de la fenetre à droite au niveau 2
    else if(player.x == 515 && player.y == 140 && direction == "left"){
        player.x = 330;
    }
    //On va en bas (vers le niveau 1) de la fenetre à gauche au niveau 2
    else if(player.x == 330 && player.y == 140 && direction == "down"){
        player.y = 240;
    }
    //On va en bas (vers le niveau 1) de la fenêtre à droite au niveau 2
    else if(player.x == 515 && player.y == 140 && direction == "down"){
        player.y = 240;
    }
    //On va en bas (vers le niveau 0) de la fenetre à gauche au niveau 1
    else if(player.x == 330 && player.y == 240 && direction == "down"){
        player.y = 340;
    }
    //On va en bas (vers le niveau 0) de la fenetre à droite au niveau 1
    else if(player.x == 515 && player.y == 240 && direction == "down"){
        player.y = 340;
    }
    //On va en haut (vers le niveau 1) de la fenetre à gauche au niveau 0
    else if(player.x == 330 && player.y == 340 && direction == "up"){
        player.y = 240;
    }
    //On va en haut (vers le niveau 2) de la fenetre à gauche au niveau 1
    else if(player.x == 330 && player.y == 240 && direction == "up"){
        player.y = 140;
    }
    //On va en haut (vers le niveau 1) de la fenetre à droite au niveau 0
    else if(player.x == 515 && player.y == 340 && direction == "up"){
        player.y = 240;
    }
    //On va en haut (vers le niveau 2) de la fenetre à droite au niveau 1
    else if(player.x == 515 && player.y == 240 && direction == "up"){
        player.y = 140;
    }
    //On va vers la droite (au même niveau) de la fenetre à gauche au niveau 1
    else if(player.x == 330 && player.y == 240 && direction == "right"){
        player.x = 515;
    }
    //On va vers la gauche (au même niveau) de la fenetre à droite au niveau 1
    else if(player.x == 515 && player.y == 240 && direction == "left"){
        player.x = 330;
    }
    //On va vers la droite (au même niveau) de la fenetre à gauche au niveau 0
    else if(player.x == 330 && player.y == 340 && direction == "right"){
        player.x = 515;
    }
    //On va vers la gauche (au même niveau) de la fenetre à droite au niveau 0
    else if(player.x == 515 && player.y == 340 && direction == "left"){
        player.x = 330;
    }
}
