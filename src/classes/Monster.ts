import { Physics, Scene } from "phaser";
import { Game } from "../scenes/Game";

export class Monster extends Physics.Arcade.Image
{
    constructor(scene: Scene, x: number, y: number, key: string, frame: number) {
        super(scene, x, y, key, frame);
        this.scene = scene;

        this.scene.physics.world.enable(this);
        this.setImmovable(true);

        this.setScale(2);
        this.setVelocity(0, 0);
        this.setOrigin(0, 1);
        
        this.setCollideWorldBounds(true);

        this.scene.add.existing(this);
    }
}