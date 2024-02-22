import { Scene } from 'phaser';
import { Map } from '../classes/Map';
import { Player } from '../classes/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    map: Map;
    player: Player;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.createMap();
        this.createPlayer();
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

    update() {
        this.player.update(this.cursors);
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'bg', 'block');
    }

    createPlayer() {
        this.player = new Player(this, 224, 224, 'characters', 0);
    }

}
