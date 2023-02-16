import { Container, Sprite } from "pixi.js";
import SceneManager from "../managers/SceneManager";
import { randomInt } from "../utils/math";
import Scene from "./Scene";

function randomColor() {
    return "cdhs".at(randomInt(0, 3));
}

function randomValue() {
    const i = randomInt(1, 13);
    return `${i < 10 ? `0${i}` : i}`;
}

export default class CardGameScene extends Scene {
    protected override init() {
        this._container.addChild(this.createButton(SceneManager.Scenes.MAIN_MENU));

        const stack1 = this._container.addChild(new Container());
        const stack2 = this._container.addChild(new Container());

        for (let i = 0; i < 14; ++i) {
            const card = stack1.addChild(this.createRandomCard());
            card.y = 10 * i;
        }

        for (let i = 0; i < 14; ++i) {
            const card = stack2.addChild(this.createRandomCard());
            card.y = 10 * i;
        }

        const halfWidth = this._width >> 1;
        stack1.x = halfWidth + 10;
        stack2.x = halfWidth - stack2.width - 10;
    }

    private createRandomCard() {
        return Sprite.from(`${randomColor()}${randomValue()}.png`);
    }
}
