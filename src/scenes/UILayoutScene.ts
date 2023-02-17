import Scene from "./Scene";
import HorizontalLayout from "../ui/layouts/HorizontalLayout";
import LayoutGroup from "../ui/LayoutGroup";
import { Sprite, TextStyle, Text } from "pixi.js";
import SceneManager from "../managers/SceneManager";
import { random, randomInt } from "../utils/math";
import Button from "../ui/Button";
import HomeButton from "../ui/HomeButton";

const SPRITE_NAMES = ["star", "heart"];

const getRandomName = () => SPRITE_NAMES[randomInt(0, SPRITE_NAMES.length - 1)];

export default class UILayoutScene extends Scene {
    private _layoutGroup!: LayoutGroup;
    private timerId = -1;
    private homeButton!: HomeButton;

    public override init() {
        this.homeButton = this._container.addChild(new HomeButton()
            .once(Button.Events.CLICK, () => {
                this.game.sceneManager.add(SceneManager.Scenes.MAIN_MENU);
            }));

        const layout = new HorizontalLayout();
        layout.gap = 10;

        this._layoutGroup = this._container.addChild(new LayoutGroup(layout));

        this.timerId = this.game.timer.registerTimer(2000, this.reset.bind(this), true);
        this.reset();
    }

    public override dispose() {
        this.homeButton.off(Button.Events.CLICK);
        this.game.timer.unregisterTimer(this.timerId);
    }

    private reset() {
        this._layoutGroup.removeChildren();

        let i = 3;
        while (i-- > 0) {
            const name = getRandomName();
            randomInt(0, 1) == 1 ? this.addImage(name) : this.addText(name);
        }

        this.layout();
    }

    protected override layout() {
        this._layoutGroup.layout();
        this._layoutGroup.x = (this._width - this._layoutGroup.width) >> 1;
        this._layoutGroup.y = (this._height - this._layoutGroup.height) >> 1;
    }

    private addImage(name: string) {
        const image = Sprite.from(`${name}.png`);
        image.scale.set(random(0.3, 1));
        this._layoutGroup.addChild(image);
    }

    private addText(name: string) {
        const style = new TextStyle({
            fontSize: randomInt(20, 40),
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'],
            stroke: '#4a1850',
            strokeThickness: 5,
            lineJoin: 'round',
        });

        this._layoutGroup.addChild(new Text(name, style));
    }
}

