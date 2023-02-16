import { Container } from "pixi.js";
import ILayout from "./ILayout";

export default class HorizontalLayout implements ILayout {
    public gap = 0;

    public update(container: Container) {
        let offset = 0;

        container.children.forEach(c => {
            const rect = c.getBounds();

            c.y = (container.height - rect.height) >> 1;
            c.x = offset;

            offset += rect.width + this.gap;
        });
    }
}
