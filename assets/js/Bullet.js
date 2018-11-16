class Bullet extends Phaser.GameObjects.Image{

    constructor(scene){
        super();
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'arrow');

        this.speed = 0;
        this.born = 0;
    }

    fire (player)
    {
        this.setPosition(player.x, player.y);

        if (facing_left == true){
            //  Facing left
            this.setPosition((player.x-50), player.y);
            this.flipX = 1;
            this.speed = Phaser.Math.GetSpeed(-1000, 1);
        }
        else{
            //  Facing right
            this.setPosition((player.x+50), player.y);
            this.flipX = 0;
            this.speed = Phaser.Math.GetSpeed(1000, 1);
        }

        this.born = 0;
    }

    update (time, delta)
    {
        this.x += this.speed * delta;

        this.born += delta;

        if (this.born > 1000)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

}

export default Bullet;