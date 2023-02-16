import { Container } from "pixi.js";
import ILayout from "./layouts/ILayout";

export default class LayoutGroup extends Container {
    constructor(private _layout: ILayout) {
        super();
    }

    public layout() {
        this._layout.update(this);
    }
}
