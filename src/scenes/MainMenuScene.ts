import Scene from "./Scene";
import SceneManager from "../managers/SceneManager";
import Button from "../ui/Button";
import VerticalLayout from "../ui/layouts/VerticalLayout";
import LayoutGroup from "../ui/LayoutGroup";

export default class MainMenuScene extends Scene {
    private _layoutGroup!: LayoutGroup;
    private _buttons: Button[] = [];

    public override init() {
        const layout = new VerticalLayout();
        layout.gap = 10;

        this._layoutGroup = this._container.addChild(new LayoutGroup(layout));

        this.addButton(SceneManager.Scenes.CARD_GAME);
        this.addButton(SceneManager.Scenes.UI_LAYOUT);
        this.addButton(SceneManager.Scenes.PARTICLES);

        this.layout();
    }

    public override dispose() {
        this._buttons.forEach(b => this._layoutGroup.removeChild(b.off(Button.Events.CLICK)));
    }

    protected override layout() {
        this._layoutGroup.layout();
        this._layoutGroup.x = (this._width - this._layoutGroup.width) >> 1;
        this._layoutGroup.y = (this._height - this._layoutGroup.height) >> 1;
    }

    protected createButton(name: string) {
        return new Button(name)
            .once(Button.Events.CLICK, () => {
                this.game.sceneManager.add(name);
            });
    }

    private addButton(name: string) {
        this._buttons.push(this._layoutGroup.addChild(this.createButton(name)));
    }

}
