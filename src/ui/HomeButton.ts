import { Container, Sprite } from "pixi.js";

export default class HomeButton extends Container {
    constructor() {
        super();

        this.interactive = true;
        this.cursor = "pointer";

        this.addChild(Sprite.from("home.png"));
    }
}

