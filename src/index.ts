import { Application, Assets, Text } from "pixi.js"
import Game from "./Game";

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: window.innerWidth,
    height: window.innerHeight
});

Assets.add("atlas", "atlas.json");
Assets.add("emitter", "emitter.json");

Assets.load(["atlas", "emitter"]).then(() => {
    const game = new Game(app, window.innerWidth, window.innerHeight);
    // @ts-ignore
    window.game = game;

    const fps = app.stage.addChild(new Text("0FPS"));
    fps.y = app.screen.height - fps.height;

    window.addEventListener("resize", () => {
        game.resize(window.innerWidth, window.innerHeight);
        fps.y = app.screen.height - fps.height;
    });

    var elapsed = Date.now();
    app.ticker.add(() => {
        fps.text = `${app.ticker.FPS.toFixed(2)}FPS`;

        var now = Date.now();
        game.update((now - elapsed) * 0.001);

        elapsed = now;
    });
});
