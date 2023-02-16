import { Application, Assets, Text } from "pixi.js"
import Game from "./Game";

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    // width: 640,
    // height: 480
});

Assets.add("atlas", "atlas.json");
Assets.add("emitter", "emitter.json");

Assets.load(["atlas", "emitter"]).then(() => {
    const game = new Game(app);

    const fps = app.stage.addChild(new Text("0FPS"));
    fps.y = app.screen.height - fps.height;

    var elapsed = Date.now();
    app.ticker.add(() => {
        fps.text = `${app.ticker.FPS}FPS`;

        var now = Date.now();
        game.update((now - elapsed) * 0.001);

        elapsed = now;
    });
});
