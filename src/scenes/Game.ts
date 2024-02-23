import { Scene } from 'phaser';
import { Map } from '../classes/Map';
import { Player } from '../classes/Player';
import { Direction } from '../enum/Direction';
import { Monster } from '../classes/Monster';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    map: Map;
    player: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    mapData: Array<Object>;
    mobs: Array<Monster> = [];
    static readonly TILE_SIZE = 64;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.createMap();
        this.createPlayer();
        this.createMonsters();
        this.createInputs();
        this.addCollisions();
        /*this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.msg_text = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.msg_text.setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });*/
    }

    update(_time: number, delta: number) {
        this.player.update(delta);
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'bg', 'block');
        this.mapData = this.map.map.objects;
    }

    createPlayer() {
        this.player = new Player(this, 224, 224, 'characters', 0);
    }

    createMonsters() {
        this.mapData.forEach((layer) => {
            switch(layer.name) {
                case 'mobs':
                    layer.objects.forEach((obj) => {
                        this.mobs.push(new Monster(this, obj.x*2, obj.y*2, 'monsters', 11));
                    })
                    break;
            }
        });
    }

    createInputs() {
        this.input.keyboard.on('keydown-A', event => {
            this.player.startMove(Direction.LEFT);
        });
        this.input.keyboard.on('keydown-D', event => {
            this.player.startMove(Direction.RIGHT);
        });
        this.input.keyboard.on('keydown-W', event => {
            this.player.startMove(Direction.UP);
        });
        this.input.keyboard.on('keydown-S', event => {
            this.player.startMove(Direction.DOWN);
        });
    }

    addCollisions() {
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.mobs.forEach(mob => {
            this.physics.add.collider(this.player, mob);
            this.physics.add.collider(mob, this.map.blockedLayer);
        });
    }

}
