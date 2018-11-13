class loadingScene extends Phaser.Scene{

    constructor(){
        super({
            key: 'loadingScene'
        });
    }

    init(data){
        this.level_data = data.level_data;

        let loading_text = this.add.text(340, 300, "Loading", {
            "font" : "50px Arial",
            "fill" : "#ffffff"
        });
    }
    preload(){
        let assets = this.level_data.assets;
        for (let asset_key in assets){
            let asset = assets[asset_key];
            switch(asset.type){
                case 'image': 
                    this.load.image(asset_key, asset.source);
                    break;
                case 'spritesheet':
                    this.load.spritesheet(asset_key, asset.source, {
                        frameWidth: asset.frame_width,
                        frameHeight: asset.frame_height,
                        frames: asset.frames,
                        margin: asset.margin,
                        spacing: asset.spacing
                    });
            }
        }
    }

    create(){

        this.scene.start("mainMenu", {
            level_data: this.level_data
        });
    }
    update(){

    }
}

export default loadingScene;