import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Sprite;
    keys: {
        up: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
    };

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x8682ca);
        EventBus.emit("current-scene-ready", this);
        this.player = this.add.sprite(150, 150, "");

        const keys: any = this.input.keyboard!.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down: Phaser.Input.Keyboard.KeyCodes.S,
        });

        this.keys = keys;
    }

    update() {
        const speed = 2;
        const vel = speed * this.time.timeScale;

        if (this.keys.right.isDown) {
            this.player.x += vel;
        } else if (this.keys.left.isDown) {
            this.player.x -= vel;
        }

        if (this.keys.up.isDown) {
            this.player.y -= vel;
        } else if (this.keys.down.isDown) {
            this.player.y += vel;
        }
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
