import SceneManager from "../managers/SceneManager";
import Scene from "./Scene";
import { Emitter } from "@pixi/particle-emitter";
import { Assets, Container } from "pixi.js";

export default class ParticlesScene extends Scene {
    private _emitter!: Emitter;
    private _partilcesContainer!: Container;
    private _elapsed = 0.0;

    protected override init() {
        this._container.addChild(this.createButton(SceneManager.Scenes.MAIN_MENU));

        this._partilcesContainer = this._container.addChild(new Container());
        this._partilcesContainer.y = this._height - 20;

        this._emitter = new Emitter(
            this._partilcesContainer,
            Assets.get("emitter")
        );
        this._emitter.emit = true;
    }

    public override update(delta: number) {
        this._emitter.update(delta);
        this._elapsed += delta;

        const halfWidth = this._width >> 1;
        const newX = halfWidth + Math.cos(this._elapsed) * halfWidth;
        // @ts-ignore
        this._emitter.updateOwnerPos(newX, this._emitter.ownerPos.y);
    }
}
