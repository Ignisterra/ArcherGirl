/**
*
* Déclaration de la config du jeu utilisé par Phaser
* lors de l'initialisation du jeu
*
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game_container',
    title: "Archer Girl",
    url: 'localhost:8080/ArcherGirl/ArcherGirl/index.html',
    version: "0.0.2",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        key: "level1_standalone",
        preload: preload,
        create: create,
        update: update,
        extend:{
            bullets: null
        }
    }
};

var game = new Phaser.Game(config);

var facing_left = true;
var facing_right = false;

/*Sprites*/
var player;
var enemy;
var toilet;

var enemy_posX;
var enemy_posY;

/*Button*/
var cursors;
var fireButton;

/*Variables diverses*/
var timer;
var timeLeft;
var score;
var enemy_dead;
var toilet_dead;
var camera;
var metoo;
var gameOver;
var restart_game;

/*Textes*/
var timer_text;
var score_text;
var retry_text;


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

/**
*
* Fonction preload de la scene()
* On y charge les éléments utilisés pour le jeu dans la mémoire
* Ne s'y passe rien d'autre
*
*/

function preload(){

        this.load.image('level1_background', 'assets/game_assets/background/level1_background_temp.png');
        this.load.image('game_over_background', 'assets/game_assets/background/game_over.png');
        this.load.image('metoo_background', 'assets/game_assets/background/metoo.png');

        this.load.spritesheet('ayumi', 'assets/game_assets/sprites/new_ayumi_line.png', { 
            frameWidth: 32, 
            frameHeight: 48 
        });

        this.load.spritesheet('pervert', 'assets/game_assets/sprites/Pervert_manteau_bande.png', { 
            frameWidth: 31, 
            frameHeight: 39 
        });

        this.load.spritesheet('toilet', 'assets/game_assets/sprites/toilet_sheet.png', {
            frameWidth: 32,
            frameHeight: 64
        });

        this.load.image('arrow', 'assets/game_assets/sprites/pink_arrow.png');

        this.load.image('arrow_down', 'assets/game_assets/sprites/pink_arrow_down.png');

        console.log("preload done");
}

/**
*
* Fonction Create de la scene
* Ne s'exécute qu'une fois le preload terminé
* C'est ici qu'on ajoute tous les variables et fonctions que l'on aura besoin de lancer dans update()
*
*/

function create(){

/*    resize();
	window.addEventListener('resize', resize);*/
    
    /**
    *
    * Sprites and Image Creation
    *
    */ 

    this.add.image(400, 300, 'level1_background');

    player = this.physics.add.sprite(330, 140, 'ayumi');

    enemy = this.physics.add.sprite(750,500, 'pervert');

    toilet = this.physics.add.sprite(200, 70, 'toilet');

    enemy_dead = false;
    toilet_dead = false;

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    camera = this.cameras.main.setSize(800, 600);

    metoo = 0;

    this.input.keyboard.createCombo('metoo');

    /**
    *
    * @var timer {int} - timer represente une frame du jeu
    *   
    */

    timer = 0;
    timeLeft = 60;
    timer_text = this.add.text(10,10, "Time Left: "+timer, {
        font: "20px Arial",
        fill: "#ffffff"
    });


    /**
    *
    * @var timer {int} - timer represente une frame du jeu
    *   
    */

    score = 0;

    score_text = this.add.text(10,40, "Score: "+score, {
        font: "20px Arial",
        fill: "#ffffff"
    });

    gameOver = false;
    restart_game = false;
     

    /**
    *
    * Sprites Animations
    *
    */

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('ayumi', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('ayumi', { start: 4, end: 5 }),
        frameRate: 10,
        repeat: 0
    });

    this.anims.create({
        key: 'enemy_left',
        frames: this.anims.generateFrameNumbers('pervert', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
    });

    this.anims.create({
        key: 'enemy_right',
        frames: this.anims.generateFrameNumbers('pervert', { start: 4, end: 7 }),
        frameRate: 3,
        repeat: -1
    });

    this.anims.create({
        key: 'toilet_opening',
        frames: this.anims.generateFrameNumbers('toilet', { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1
    });

    /**
    *
    * Bullets Creator
    *
    */
        var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow');

            this.speed = 0;
            this.born = 0;
            this.posX = 0;
            this.posY = 0;   
        },

        fire: function (player)
        {
            this.setPosition(player.x, player.y);

            if (facing_left == true){
                //  Facing left
                this.setPosition((player.x-50), player.y);
                this.posX = (player.x-50);
                this.posY = player.y;
                this.flipX = 1;
                this.speed = Phaser.Math.GetSpeed(-1000, 1);
            }
            else{
                //  Facing right
                this.setPosition((player.x+50), player.y);
                this.posX = (player.x-50);
                this.posY = player.y;
                this.flipX = 0;
                this.speed = Phaser.Math.GetSpeed(1000, 1);
            }

            this.born = 0;
        },

        update: function (time, delta)
        {
            this.x += this.speed * delta;

            if(Math.floor(toilet.y) == this.posY){
                console.log("Touché");
                score  = score +10;
                toilet.destroy();
                toilet_dead = true;
            }

            this.born += delta;

            if (this.born > 1000)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    /**
    *
    * Bullet Down to Earth
    *
    */

    var Bullet_down = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet_down (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow_down');

            this.speed = 0;
            this.born = 0;
            this.posX = 0;
            this.posY = 0;  
        },

        fire: function (player)
        {
            this.setPosition(player.x, player.y);

            if (facing_left == true){
                //  Facing left
                this.setPosition((player.x), (player.y+50));
                this.posX = player.x;
                this.posY = (player.y+50);
                this.flipX = 1;
                this.speed = Phaser.Math.GetSpeed(-1000, 1);
            }
            else{
                //  Facing right
                this.setPosition((player.x), (player.y+50));
                this.flipX = 0;
                this.posX = player.x;
                this.posY = (player.y+50);
                this.speed = Phaser.Math.GetSpeed(-1000, 1);
            }

            this.born = 0;
        },

        update: function (time, delta)
        {
            this.y -= this.speed * delta;
            
            if(Math.floor(enemy.x) == this.posX ){
                console.log("Touché");
                score  = score +10;
                enemy.destroy();
                enemy_dead = true;
            }


            this.born += delta;

            if (this.born > 1000)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    this.bullets_down = this.physics.add.group({ classType: Bullet_down, runChildUpdate: true });

    /* Initial game action*/

    enemy.setVelocityX(-70);
    enemy.anims.play('enemy_left', true);

    toilet.setVelocityY(-70);
    toilet.anims.play('toilet_opening', true);

    console.log("create done");
}

/**
*
*
* Update scene function
* Repeating in the scene every frame
*
*
*/

function update(){

    /**
    *
    * Respawning ennemies sprites after destroyed
    * Re setting initial actions
    *
    */

    if(enemy_dead){

        enemy = this.physics.add.sprite(750,500, 'pervert');
        enemy.setVelocityX(-70);
        enemy.anims.play('enemy_left', true);
        enemy_dead = false;
    }

    if(toilet_dead){

        toilet = this.physics.add.sprite(200, 70, 'toilet');
        toilet.setVelocityY(-70);
        toilet.anims.play('toilet_opening', true);
        toilet_dead = false;
    }


    /**
    *
    *
    * Keyboard Events
    *
    *
    */
        if(Phaser.Input.Keyboard.JustDown(cursors.left)){
            moveToWindow(player, "left");

            if(facing_right){

                player.anims.play('left', true);
                facing_right = false;
                facing_left = true;
            }
        }

        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            moveToWindow(player, "right");

            if(facing_left){
                player.anims.play('right', true);
                facing_left = false;
                facing_right = true;
            }
        }

        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            moveToWindow(player, "down");
        }

        else if ((cursors.down.isDown)){
            if(Phaser.Input.Keyboard.JustDown(fireButton)){
                console.log("Bottom + Space Bar");

                var bullet_down  = this.bullets_down.get();

                this.physics.add.collider(bullet_down, enemy);

                bullet_down.setActive(true);
                bullet_down.setVisible(true);

                if (bullet_down){
                    bullet_down.fire(player);
                    /*this.lastFired = time + 100;*/
                }
            }
        }

        else if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            moveToWindow(player, "up");
        }


    if (Phaser.Input.Keyboard.JustDown(fireButton)){
        var bullet = this.bullets.get();
        bullet.setActive(true);
        bullet.setVisible(true);

        this.physics.add.collider(bullet, toilet);

        if (bullet){
            bullet.fire(player);
            /*this.lastFired = time + 100;*/
        }
    }
    
    if(enemy.x < 10){
        enemy.setVelocityX(100);
        enemy.anims.play('enemy_right', true);
    }

    else if(enemy.x > 750){
        enemy.setVelocityX(-100);
        enemy.anims.play('enemy_left', true);
    }
    
    if(toilet.y > 400){
        toilet.setVelocityY(-100);
    }

    else if(toilet.y < 10){
        toilet.setVelocityY(100);

    }

    this.input.keyboard.on('keycombomatch', function (event) {
        console.log('Key Combo matched!');
        metoo = 1;
        timeLeft = 1;
    });

    /**
    *
    *Défilement du timer
    *
    */

    /*Timer frame by frame*/
    timer = timer+1;

    /*Compte à rebours avant redémarrage*/
    /*Toutes les 100 frames*/
    if((timer%100) == 0){
        timeLeft = timeLeft-1;

        if(timeLeft < 1){

            if(timeLeft == 0){
                camera.fadeOut(3000);

                camera.on('camerafadeoutcomplete', function () {
                    camera.resetFX();
                    gameOver = true;
                    timeLeft = -1;
                });
            }

            if(gameOver && metoo == 1){
                gameOver = false;
                camera.resetFX();

                this.add.image(400, 300, 'metoo_background');
/*                retry_text = this.add.text(330, 400, "Retry ?", {
                    fontSize: "40px",
                    fill: "#ffffff"
                } );

                retry_text.setInteractive();
                retry_text.on('pointerdown', function () {
                    console.log("retry");
                    restart_game = true;
                });*/

            }

            else if(gameOver && metoo == 0){
                gameOver = false;
                camera.resetFX();

                this.add.image(400, 300, 'game_over_background');
                retry_text = this.add.text(330, 400, "Retry ?", {
                    fontSize: "40px",
                    fill: "#ffffff"
                } );

                retry_text.setInteractive();
                retry_text.on('pointerdown', function () {
                    console.log("retry");
                    restart_game = true;
                });

            }
            
        }
    }

    if(restart_game){
        this.scene.restart();
    }

    timer_text.setText("Time Left: " + timeLeft);
    score_text.setText("Score: " + score);
}