import Game from "../Game";
import Scene from "../scenes/Scene";
import MainMenuScene from "../scenes/MainMenuScene";
import CardGameScene from "../scenes/CardGameScene";
import UILayoutScene from "../scenes/UILayoutScene";
import ParticlesScene from "../scenes/ParticlesScene";
import { Container } from "pixi.js";

enum Scenes {
    MAIN_MENU = "MainMenu",
    CARD_GAME = "CardGame",
    UI_LAYOUT = "UILayout",
    PARTICLES = "Particles",
}

const SCENES: Record<Scenes, typeof Scene> = {
    [Scenes.MAIN_MENU]: MainMenuScene,
    [Scenes.CARD_GAME]: CardGameScene,
    [Scenes.UI_LAYOUT]: UILayoutScene,
    [Scenes.PARTICLES]: ParticlesScene,
};

export default class SceneManager {
    static Scenes = Scenes;

    private _scene!: Scene;
    private _container: Container;

    constructor(private readonly game: Game) {
        this._container = new Container();
        this.game.app.stage.addChild(this._container);
    }

    public add(name: Scenes | string) {
        this._scene?.destroy();

        this._scene = this.createScene(name as Scenes);
        this._scene.init();
        this._scene.attachTo(this._container);
    }

    public update(delta: number) {
        this._scene.update(delta);
    }

    private createScene(name: Scenes) {
        return new SCENES[name](this.game);
    }
}
