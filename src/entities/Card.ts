import { Container, Sprite } from "pixi.js";
import { Tween } from "tweedle.js";

export default class Card extends Container {
    private _tween!: Tween<Card>;

    constructor(name: string) {
        super();
        this.addChild(Sprite.from(name));
    }

    public moveTo(x: number, y: number) {
        this._tween = new Tween(this).to({ x, y }, 2000).start();
        this._tween.start();
    }
}
