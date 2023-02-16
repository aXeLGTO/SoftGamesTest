import {Application} from 'pixi.js';
import SceneManager from "./managers/SceneManager"
import Timer from "./utils/Timer"

export default class Game {
    public readonly sceneManager: SceneManager;
    public readonly timer = new Timer();

    constructor(public readonly app: Application) {
        // @ts-ignore
        window.game = this;

        this.sceneManager = new SceneManager(this);
        this.sceneManager.add(SceneManager.Scenes.MAIN_MENU);
    }

    public update(delta: number) {
        this.timer.update(delta);
        this.sceneManager.update(delta);
    }
}
