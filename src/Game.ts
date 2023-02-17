import {Application} from 'pixi.js';
import SceneManager from "./managers/SceneManager"
import Timer from "./utils/Timer"

export default class Game {
    public readonly sceneManager: SceneManager;
    public readonly timer = new Timer();

    constructor(public readonly app: Application,
                width: number, height: number) {
        app.renderer.resize(width, height);
        this.sceneManager = new SceneManager(this, app.screen.width, app.screen.height);
        this.sceneManager.add(SceneManager.Scenes.MAIN_MENU);
    }

    public resize(w: number, h: number) {
        this.app.renderer.resize(w, h);
        this.sceneManager.resize(this.app.screen.width, this.app.screen.height);
    }

    public update(delta: number) {
        this.timer.update(delta);
        this.sceneManager.update(delta);
    }
}
