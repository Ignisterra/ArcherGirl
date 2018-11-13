	import jsonLevelScene from './jsonLevelScene';

	var level1_start;

class mainMenu extends jsonLevelScene{

    constructor(){
        super('mainMenu');

        this.toilet;
        console.log("Main Menu chargé");
    }

    preload(){
    	    this.load.spritesheet('toilet', 'assets/game_assets/sprites/toilet.png', { 
            frameWidth: 32, 
            frameHeight: 61 
        });

    }

    create(){

    	this.add.text(180, 200, "Archer Girl: the Video Game", {font:"40px Arial"});
    	this.add.text(300, 250, "Click on the toilet to start", {font:"20px Bahnschrift"});
    	this.toilet = this.add.sprite(400, 300, 'toilet');
    	this.toilet.setOrigin(0,0);
    	this.toilet.setInteractive();

        this.toilet.on("pointerdown", function(){
        	level1_start = true;
        	console.log(level1_start);
        });
    }
    update(){

    	    if(level1_start == true){
            	console.log("Launching Level 1");
            	this.scene.start("level1");		
            }
		

    }
}

export default mainMenu;