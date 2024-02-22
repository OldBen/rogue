import { Physics, Scene } from "phaser";

export class Player extends Physics.Arcade.Image 
{

    constructor(scene: Scene, x: integer, y: integer, key: string, frame: integer) {
        super(scene, x, y, key, frame);
        this.scene = scene;

        this.scene.physics.world.enable(this);
        this.setImmovable(false);

        this.setScale(2);
        this.setCollideWorldBounds(true);

        this.scene.add.existing(this);
        this.scene.cameras.main.startFollow(this);
    }

}