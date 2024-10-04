import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    player: Phaser.GameObjects.Sprite;
    isRight = true;

    constructor() {
        super("Game");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x1199aa);
        EventBus.emit("current-scene-ready", this);
        this.player = this.add.sprite(150, 150, "star");
    }

    update() {
        const speed = 4;
        const vel = this.isRight ? speed : -speed;
        this.player.x += vel * this.time.timeScale;

        if (this.player.x >= 1024 && this.isRight) {
            this.isRight = false;
        } else if (this.player.x <= 0 && !this.isRight) {
            this.isRight = true;
        }
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
