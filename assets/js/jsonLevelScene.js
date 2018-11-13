class jsonLevelScene extends Phaser.Scene{

    constructor(key){
        super({
            key: key
        });
    }

    init(data){
    	this.level_data = data.level_data;
    }

    create(){
		this.groups = {};
		this.level_data.groups.forEach(function(group_name){
			this.groups[group_name] = this.add.group();
		}, this);

		this.sprites = {};
        for(let sprite_name in this.level_data.sprites){
        	let sprite_data = this.level_data.sprites[sprite_name];
        	let sprite = undefined;
        	switch(sprite_data.type){
        		case 'sprite':
        			sprite = this.add.sprite(sprite_data.position.x, sprite_data.position.y, sprite_data.texture);
        			break;
        		case 'text':
        			sprite = this.add.text(sprite_data.position.x, sprite_data.position.y, sprite_data.text, sprite_data.style);
        			break;
        	}
        	this.sprites[sprite_name] = sprite;
        	this.groups[sprite_data.group].add(sprite);
        }

        console.log(this.sprites);
    }
}

export default jsonLevelScene;