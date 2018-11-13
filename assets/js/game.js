import mainMenu from './mainMenu.js';
import bootScene from './bootScene.js';
import loadingScene from './loadingScene.js';
import level1 from './level1.js';

let MainMenu = new mainMenu();
let BootScene = new bootScene();
let LoadingScene = new loadingScene();
let Level1 = new level1();

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game_container',
    title: "Archer Girl",
    url: 'localhost:8080/ArcherGirl/ArcherGirl/index.html',
    version: "0.0.1",
};

var game = new Phaser.Game(config);

function preload(){

}

function create(){
	window.addEventListener('resize', resize);
    resize();
}

function update(){

}

game.scene.add('mainMenu', MainMenu);
game.scene.add('loadingScene', LoadingScene);
game.scene.add('bootScene', BootScene);
game.scene.add('level1', Level1);

game.scene.start('bootScene', {
	scene: 'mainMenu'
});

