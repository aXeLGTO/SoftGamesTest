import { Container } from "pixi.js";
import Game from "../Game"

export default class Scene {
    protected _container = new Container();

    protected _width;
    protected _height;

    constructor(protected readonly game: Game,
                width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    public init() {}

    public resize(w: number, h: number) {
        this._width = w;
        this._height = h;

        this.layout();
    }

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
