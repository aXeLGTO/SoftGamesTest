import { Container } from "pixi.js";
import ILayout from "./ILayout";

export default class VerticalLayout implements ILayout {
    public gap = 0;

    public update(container: Container) {
        let offset = 0;

        container.children.forEach(c => {
            const rect = c.getBounds();

            c.x = (container.width - rect.width) >> 1;
            c.y = offset;

            offset += rect.height + this.gap;
        });
    }
}
