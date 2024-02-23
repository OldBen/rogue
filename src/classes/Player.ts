import { Physics, Scene } from "phaser";
import { Direction } from "../enum/Direction";
import { Game } from "../scenes/Game";

export class Player extends Physics.Arcade.Image 
{
    static readonly MOVE_SPEED = 128;
    isMoving: boolean = false;
    direction: Direction = Direction.NONE;
    distanceLeft: number;

    constructor(scene: Scene, x: number, y: number, key: string, frame: number) {
        super(scene, x, y, key, frame);
        this.scene = scene;

        this.scene.physics.world.enable(this);
        this.setImmovable(false);

        this.setScale(2);
        this.setVelocity(0, 0);
        
        this.setCollideWorldBounds(true);

        this.scene.add.existing(this);
        this.scene.cameras.main.startFollow(this);
    }

    update(delta: number) {
        if (this.isMoving){
            let distanceForFrame = (Player.MOVE_SPEED * delta) / 1000;
            //let distanceToMove = Math.min(distanceForFrame, this.distanceLeft);
            console.log(this.distanceLeft, distanceForFrame, this.direction);
            if (this.distanceLeft <= distanceForFrame) this.finishMove(Math.abs(this.distanceLeft - distanceForFrame));
            else this.distanceLeft -= distanceForFrame;

        }
    }

    startMove(direction: Direction) {
        if (this.isMoving) return;
        this.isMoving = true;
        this.distanceLeft = Game.TILE_SIZE;
        switch(direction) {
            case Direction.LEFT:
                this.setVelocityX(-Player.MOVE_SPEED);
                break;
            case Direction.UP:
                this.setVelocityY(-Player.MOVE_SPEED);
                break;
            case Direction.RIGHT:
                this.setVelocityX(Player.MOVE_SPEED);
                break;
            case Direction.DOWN:
                this.setVelocityY(Player.MOVE_SPEED);
                break;
        }
        this.direction = direction;
    }

    finishMove(correctionDistance: number) {
        this.setVelocity(0, 0);
        let currentX = this.x;
        let currentY = this.y;
        switch(this.direction) {
            case Direction.LEFT:
                this.setX(currentX + correctionDistance);
                break;
            case Direction.UP:
                this.setY(currentY + correctionDistance);
                break;
            case Direction.RIGHT:
                this.setX(currentX - correctionDistance);
                break;
            case Direction.DOWN:
                this.setY(currentY - correctionDistance);
                break;
        }
        this.isMoving = false;
    }

}