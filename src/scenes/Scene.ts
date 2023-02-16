import { Container } from "pixi.js";
import Game from "../Game"

export default class Scene {
    protected _container = new Container();

    protected _width;
    protected _height;

    constructor(protected readonly game: Game) {
        this._width = this.game.app.screen.width;
        this._height = this.game.app.screen.height;
    }

    public init() {}

    protected dispose() {}

    protected layout() { }

    public attachTo(parent: Container) {
        parent.addChild(this._container);
    }

    public destroy() {
        this._container.removeFromParent();
        this.dispose();
    }

    public update(_: number) {};
}
