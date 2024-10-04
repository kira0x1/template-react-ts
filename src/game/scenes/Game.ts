import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Sprite;
    keys: {
        up: string;
        right: string;
        left: string;
        down: string;
    };

    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    isRight = true;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x1199aa);
        EventBus.emit("current-scene-ready", this);
        this.player = this.add.sprite(150, 150, "star");

        this.cursors = this.input
            .keyboard!.addCapture("W,S,A,D")
            .createCursorKeys();
    }

    update() {
        const speed = 4;
        const vel = this.isRight ? speed : -speed;
        // this.player.x += vel * this.time.timeScale;

        if (this.cursors.right.isDown) {
            this.player.x += vel * this.time.timeScale;
        } else if (this.cursors.left.isDown) {
            this.player.x -= vel * this.time.timeScale;
        }

        // if (this.player.x >= 1024 && this.isRight) {
        //     this.isRight = false;
        // } else if (this.player.x <= 0 && !this.isRight) {
        //     this.isRight = true;
        // }
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
