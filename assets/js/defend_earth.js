var game = new Phaser.Game(860, 484, Phaser.CANVAS, 'conquete');

var sprite;
var reine;
var bullets;
var bees;
var cursors;
var bullet;
var bulletTime = 0;
var cadavre = 0;
var beespeed = 50;
var viereine = 50;
var madz;
var music;
var terre;


/* ACCUEIL */
var menuState = {
  preload: function () {
	/*game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;*/
	game.load.spritesheet('player', 'img/avion.png', 80, 65);
	game.load.spritesheet('bee', 'img/bee.png', 50, 46);
	game.load.spritesheet('imgreine', 'img/reine.png', 334, 315);
	game.load.spritesheet('terre', 'img/terre.png', 202, 202);
	game.load.spritesheet('pluton', 'img/pluton.png', 56, 56);
	game.load.image('madz', 'img/mademoiselle.png');
	game.load.image('hero', 'img/hero.png');
	game.load.image('arrive', 'img/arrive.png');
	game.load.image('soleil', 'img/soleil.png');
	game.load.image('fou', 'img/fou.png');
	game.load.image('mari', 'img/mari.png');
	game.load.image('fait', 'img/fait.png');
    game.load.image('bullet', 'img/bullet.png');
	game.load.image('background', 'img/bg.png');
	game.load.image('logo', 'img/logo.png');
	game.load.image('press', 'img/press.png');
	game.load.image('oups', 'img/oups.png');
	game.load.image('merci', 'img/merci.png');
	game.load.audio('shoot', 'son/shoot.wav');
	game.load.audio('boom', 'son/boom.wav');
	game.load.audio('music', 'son/love.wav');
	game.load.audio('combat', 'son/action.wav');
	game.load.video('space', 'img/fin.mp4');
  },
  
  create: function () {
	game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	game.background.autoScroll(-40, 0);
	
	logo = this.add.tileSprite(this.game.width/2, 30, 360, 300, 'logo');
	logo.anchor.setTo(0.5, 0);
	
	press = this.add.tileSprite(this.game.width/2, this.game.height-65, 438, 70, 'press');
	press.anchor.setTo(0.5, 0.5);
	
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
	game.input.gamepad.start();
	pad1 = game.input.gamepad.pad1;
	
	music = game.add.audio('music');
	music.loop = true;
	music.play();
	music.volume = 0.04;
	
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || pad1.isDown(Phaser.Gamepad.XBOX360_A) || game.input.pointer1.isDown || game.input.activePointer.isDown) {
        game.state.start('debut');
    } 
  }
};


/*Debut*/
var debutState = {

  create: function () {
	  
	game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	game.background.autoScroll(-60, 0);
	
	pluton = game.add.sprite(-56, this.game.height/2, 'pluton');
	pluton.animations.add('love', [0, 1], 6, true);
	pluton.anchor.setTo(0.5, 0.5);
	
	terre = game.add.sprite(1100, 110, 'terre');
	terre.animations.add('love', [0, 1], 6, false);
	terre.anchor.setTo(0.5, 0.5);
	
	game.add.tween(pluton).to( { x: '+400' }, 3000, Phaser.Easing.Sinusoidal.None, true);
	
	game.time.events.add(1000, function () {
		game.add.tween(terre).to( { x: '-650' }, 2000, Phaser.Easing.Sinusoidal.None, true);
	}, this);
	
	game.time.events.add(1300, function () {
		pluton.animations.play('love');
	}, this);
	
	game.time.events.add(3000, function () {
		madz = game.add.sprite(this.game.width/2, 380, 'madz');
		madz.anchor.setTo(0.5, 0.5);
	}, this);
	
	game.time.events.add(4200, function () {
		madz.destroy();
		soleil = game.add.sprite(this.game.width/2, 380, 'soleil');
		soleil.anchor.setTo(0.5, 0.5);
	}, this);
	
	game.time.events.add(5900, function () {
		soleil.destroy();
		fou = game.add.sprite(this.game.width/2, 380, 'fou');
		fou.anchor.setTo(0.5, 0.5);
	}, this);
	
	game.time.events.add(8000, function () {
		fou.destroy();
		fait = game.add.sprite(this.game.width/2, 380, 'fait');
		fait.anchor.setTo(0.5, 0.5);
	}, this);
	
	game.time.events.add(9300, function () {
		fait.destroy();
	}, this);
	
	game.time.events.add(9200, function () {
		game.add.tween(terre).to( { x: '-400' }, 2000, Phaser.Easing.Sinusoidal.None, true);
	}, this);
	
	game.time.events.add(10300, function () {
		game.add.tween(terre).to( { y: '+150' }, 1000, Phaser.Easing.Sinusoidal.None, true);
	}, this);
	
	game.time.events.add(11200, function () {
		game.state.start('game');
	}, this);
	
  }
  
};


/*JEU*/
var gameState = {

  create: function () {

	game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	game.background.autoScroll(-60, 0);
	
	music.stop();
	
	music2 = game.add.audio('combat');
	music2.loop = true;
	music2.play();
	music2.volume = 0.04;
	

    bees = game.add.group();
    bees.enableBody = true;
    bees.physicsBodyType = Phaser.Physics.ARCADE;
	
    for (var i = 0; i < 5; i++)
    {
        var c = bees.create(game.world.randomX+600, game.world.randomY, 'bee');
		c.health = 3;
		c.animations.add('voler', [0, 1], 10, true);
		c.animations.add('amal', [2], 10, false);
		c.animations.add('vnr', [3,4], 10, false);
    }
	
	c.animations.play('voler');
	
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++)
    {
        var b = bullets.create(0, 0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
    }

	
	terre = game.add.sprite(50, 250, 'terre');
	terre.anchor.setTo(0.5, 0.5);
	terre.animations.add('love', [0, 1, 0], 5, false);
	game.physics.enable(terre, Phaser.Physics.ARCADE);
	
    sprite = game.add.sprite(344, this.game.height/2, 'player');
	sprite.animations.add('idle', [0, 1], 5, true);
	sprite.animations.add('bottom', [2, 3], 10, true);
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	sprite.body.collideWorldBounds = true;
	
	reine = game.add.sprite(870, 120, 'imgreine');
	reine.animations.add('vole', [0, 1], 5, true);
	reine.animations.add('amal', [2], 10, false);
	reine.animations.play('vole');
	game.physics.enable(reine, Phaser.Physics.ARCADE);
	

  },
  
  update: function () {

	bees.forEach(
		function(singleBee) {
			game.physics.arcade.moveToObject(singleBee, terre, beespeed);
			if (cadavre > 0) {
				singleBee.animations.play('vnr');
			}else {
				singleBee.animations.play('voler');
			}	
		}

	);
	game.physics.arcade.overlap(bullets, reine, tapelareine, null, this);
	game.physics.arcade.collide(reine);
    game.physics.arcade.overlap(bullets, bees, collisionHandler, null, this);
	game.physics.arcade.collide(bees);
	game.physics.arcade.overlap(terre, bees, collisionoups, null, this);
	
	
    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
	sprite.animations.play('idle');

    if (cursors.left.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT))
    {
        sprite.body.velocity.x = -300;
    }
    else if (cursors.right.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT))
    {
        sprite.body.velocity.x = 300;
    }
	
	if (cursors.up.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP))
	{
		sprite.body.velocity.y = -300;
		
	}
	else if (cursors.down.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN))
	{
		sprite.body.velocity.y = +300;
		sprite.animations.play('bottom', 30, true);
	}
	
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || pad1.isDown(Phaser.Gamepad.XBOX360_A))   
    {
        fireBullet();
    }
	
  }
};

/*OUPS*/
var oupsState = {

  create: function () {
	  
	game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	game.background.autoScroll(-60, 0);
	
	music.play();
	music2.stop();
	

    txtoups = game.add.tileSprite(this.game.width/2, 110, 483, 357, "oups");
	txtoups.anchor.setTo(0.5, 0);
	beespeed = 50;
	cadavre = 0;
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || pad1.isDown(Phaser.Gamepad.XBOX360_A) || game.input.pointer1.isDown || game.input.activePointer.isDown) {
        game.state.start('game');
    }  
  }
  
};

/*WIN*/
var winState = {

  create: function () {
	  
	music2.stop();
	music.play();
		
	game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	game.background.autoScroll(-60, 0);	

	pluton = game.add.sprite(350, this.game.height/2, 'pluton');
	pluton.animations.add('love', [0, 1], 6, true);
	pluton.anchor.setTo(0.5, 0.5);
	
	terre = game.add.sprite(550, 110, 'terre');
	terre.animations.add('love', [0, 1], 6, true);
	terre.anchor.setTo(0.5, 0.5);
	

	pluton.animations.play('love');
	terre.animations.play('love');
	
	game.time.events.add(1000, function () {
		hero = game.add.sprite(this.game.width/2, 380, 'hero');
		hero.anchor.setTo(0.5, 0.5);
	}, this);
	
	game.time.events.add(2500, function () {
		hero.destroy();
		arrive = game.add.sprite(this.game.width/2, 380, 'arrive');
		arrive.anchor.setTo(0.5, 0.5);
	}, this);
	
	game.time.events.add(3500, function () {
		game.add.tween(pluton).to( { x: '+150', y: '-150' }, 1500, Phaser.Easing.Sinusoidal.None, true);
	}, this);
	
	game.time.events.add(4400, function () {
		video = game.add.video('space');
		video.play(true);
		videoImage = video.addToWorld();
		var videoScale = Math.min(game.width / video.width, game.height / video.height);
		videoImage.scale.set(videoScale);
	}, this);
	
	game.time.events.add(14000, function () {
		video.destroy();
		game.state.start('merci');
	}, this);
	
	beespeed = 50;
	cadavre = 0;
	viereine = 50;
  }
  
};


/*MERCI*/
var merciState = {

  create: function () {
	  
	game.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
	game.background.autoScroll(-60, 0);

    txtmerci = game.add.tileSprite(this.game.width/2, 110, 483, 357, "merci");
	txtmerci.anchor.setTo(0.5, 0);
  },

  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || pad1.isDown(Phaser.Gamepad.XBOX360_A) || game.input.pointer1.isDown || game.input.activePointer.isDown) {
        game.state.start('menu');
		music.stop();
    }  
  }
  
};



function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.x + 72, sprite.y + 36);
            bullet.body.velocity.x = +300;
            bulletTime = game.time.now + 150;
			game.sound.play('shoot',0.01);
        }
    }

}

function resetBullet (bullet) {

    bullet.kill();

}

function tapelareine (lareine, bullet) {
		bullet.kill();
		if (cadavre > 20) {
			viereine -= 1;
			
			lareine.animations.play('amal');
			
			lareine.animations.currentAnim.onComplete.add(
				function () {
						lareine.animations.play('vole');	
					
				}, this
			);
			
			
		}

		if (viereine == 0) {
			game.state.start('win');
		}
}

function collisionHandler (bullet, bee) {
	
	bullet.kill();
	bee.health -= 1;
	
	bee.animations.play('amal');
	
	bee.animations.currentAnim.onComplete.add(
		function () {

			if (cadavre > 0) {
				bee.animations.play('vnr');
			}else {
				bee.animations.play('voler');
			}		
			
		}, this
	);
	
	if (bee.health == 0) {
		game.sound.play('boom',0.05);
		bee.kill();
		cadavre++;
		terre.animations.play('love');
		
		if (cadavre < 15) {
			beespeed = 150;
		} else {
			beespeed = 200;
		}
		
		/*Avant ici 22*/
		/*if (cadavre < 22) {*/
			var c = bees.create(game.world.randomX+750, game.world.randomY, 'bee');
			c.health = 3;
			c.animations.add('voler', [0, 1], 10, true);
			c.animations.add('amal', [2], 10, false);
			c.animations.add('vnr', [3,4], 10, false);
			c.animations.play('vnr');
		/*} */
		
		if (cadavre == 20) {
			game.physics.arcade.moveToXY(reine,670, 120,0,3000);
			
			game.time.events.add(2200, function () {
				mari = game.add.sprite(this.game.width/2, 400, 'mari');
				mari.anchor.setTo(0.5, 0.5);
			}, this);
			
			game.time.events.add(4000, function () {
				mari.destroy();
			}, this);
			
			game.time.events.add(3000, function () {
			   reine.body.velocity.setTo(0, 0)
			}, this);
		}
    }


}


function collisionoups (sprite, bee) {
	game.state.start('oups');
}

game.state.add('menu', menuState);
game.state.add('debut', debutState);
game.state.add('game', gameState);
game.state.add('oups', oupsState);
game.state.add('win', winState);
game.state.add('merci', merciState);

game.state.start('menu');