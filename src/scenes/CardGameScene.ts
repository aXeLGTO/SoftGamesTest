import SceneManager from "../managers/SceneManager";
import { randomInt } from "../utils/math";
import Scene from "./Scene";
import Card from "../entities/Card";
import HomeButton from "../ui/HomeButton";
import Button from "../ui/Button";
import { Container } from "pixi.js";
import { Group } from "tweedle.js";

function randomColor() {
    return "cdhs".at(randomInt(0, 3));
}

function randomValue() {
    const i = randomInt(1, 13);
    return `${i < 10 ? `0${i}` : i}`;
}

const OFFSET = 5;
const CARD_NUM = 144;

export default class CardGameScene extends Scene {
    private _stack1: Card[] = [];
    private _stack2: Card[] = [];

    private _stackHolder1!: Container;
    private _stackHolder2!: Container;

    private timerId = -1;

    private homeButton!: HomeButton;

    public override init() {
        this.homeButton = this._container.addChild(new HomeButton()
            .once(Button.Events.CLICK, () => {
                this.game.sceneManager.add(SceneManager.Scenes.MAIN_MENU);
            }));

        const deck = this._container.addChild(new Container());
        deck.y = this.homeButton.height + 10;
        this._stackHolder1 = deck.addChild(new Container());
        this._stackHolder2 = deck.addChild(new Container());

        for (let i = 0; i < CARD_NUM; ++i) {
            const card = this.createRandomCard();
            card.x = (this._width >> 1) - card.width - 10;
            card.y = OFFSET * i;
            this._stack1.push(card);
            this._stackHolder1.addChild(card);
        }

        this.timerId = this.game.timer.registerTimer(1000, this.moveCard.bind(this), true);
    }

    public override update() {
        Group.shared.update();
    }

    protected override dispose(): void {
        this.homeButton.off(Button.Events.CLICK);
        this.game.timer.unregisterTimer(this.timerId);
    }

    private moveCard() {
        if (this._stack1.length > 0) {
            const card = this._stack1.pop()!;

            const x = (this._width >> 1) + 10;
            const y = this._stack2.length * OFFSET;
            card.moveTo(x, y);

            this._stack2.push(card);
            this._stackHolder2.addChild(card);
        } else {
            this.game.timer.unregisterTimer(this.timerId);
        }
    }

    private createRandomCard() {
        return new Card(`${randomColor()}${randomValue()}.png`);
    }
}
