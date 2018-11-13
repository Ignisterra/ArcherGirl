class level1 extends Phaser.Scene{

    constructor(){
        super({
            key: 'level1',
        });

        this.facing_left = true;
        this.facing_right = false;
        this.player;
        this.enemy;
        this.cursors;


        console.log("Scene 1 chargée");
    }

    preload(){
        this.load.image('level1_background', 'assets/game_assets/background/level1_background_temp.png');
        this.load.spritesheet('ayumi', 'assets/game_assets/sprites/ayumi_temp.png', { 
            frameWidth: 32, 
            frameHeight: 48 
        });

        this.load.spritesheet('pervert', 'assets/game_assets/sprites/Pervert_manteau_bande.png', { 
            frameWidth: 31, 
            frameHeight: 39 
        });
    }

    create(){

        this.add.image(400, 300, 'level1_background');

        this.player = this.add.sprite(330, 140, 'ayumi');

        this.enemy = this.add.sprite(750,500, 'pervert');

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
    }

    update(){

        this.cursors = this.input.keyboard.createCursorKeys();

        if(Phaser.Input.Keyboard.JustDown(this.cursors.left)){
            moveToWindow(this.player, "left");

            if(this.facing_right){

                this.player.anims.play('left', true);
                this.facing_right = false;
                this.facing_left = true;
            }
        }

        else if(Phaser.Input.Keyboard.JustDown(this.cursors.right)){
            moveToWindow(this.player, "right");

            if(this.facing_left){
                this.player.anims.play('right', true);
                this.facing_left = false;
                this.facing_right = true;
            }
        }

        else if(Phaser.Input.Keyboard.JustDown(this.cursors.down)){
            moveToWindow(this.player, "down");
        }

        else if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            moveToWindow(this.player, "up");
        }
    }
}

export default level1;