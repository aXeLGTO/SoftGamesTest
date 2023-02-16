import { Container, Sprite, Text, TextStyle } from "pixi.js";

const textStyle = new TextStyle({
    fontSize: 36,
    fontWeight: "bold",
    fill: "white",
});

enum Events {
    CLICK = "pointerdown",
}

export default class Button extends Container {
    static Events = Events;

    private textField!: Text;

    constructor(private text: string) {
        super();
        this.init();
    }

    protected init() {
        this.interactive = true;
        this.cursor = "pointer";

        this.addChild(Sprite.from("button.png"));

        this.textField = this.addChild(new Text(this.text, textStyle));
        this.textField.x = (this.width - this.textField.width) >> 1
        this.textField.y = (this.height - this.textField.height) >> 1
    }
}

