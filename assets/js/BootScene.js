class bootScene extends Phaser.Scene{

    constructor(){
        super({
            key: 'bootScene'
        });

        this.levels = {
            mainMenu: {
                key: 'mainMenu_level',
                path: 'assets/js/levels/mainMenu.json'
            }
        }

    }

    preload(){
        for(let level_name in this.levels){
            let level = this.levels[level_name];
            this.load.json(level_name, level.path);
        }
    }

    create(data){
        let level_data = this.cache.json.get(data.scene);

        this.scene.start('loadingScene', {
            level_data: level_data
        });
    }
    update(){

    }
}

export default bootScene;