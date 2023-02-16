import { Container } from "pixi.js";
import Game from "../Game"
import Button from "../ui/Button";

export default class Scene {
    protected _container = new Container();

    protected _width;
    protected _height;

    constructor(protected readonly game: Game) {
        this._width = this.game.app.screen.width;
        this._height = this.game.app.screen.height;

        this.init();
    }

    protected init() {}

    protected dispose() {}

    protected layout() { }

    protected createButton(name: string) {
        return new Button(name)
            .once(Button.Events.CLICK, () => {
                this.game.sceneManager.add(name);
            });
    }

    public attachTo(parent: Container) {
        parent.addChild(this._container);
    }

    public destroy() {
        this._container.removeFromParent();
        this.dispose();
    }

    public update(_: number) {};
}
