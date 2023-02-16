import { Container } from "pixi.js";

export default interface ILayout {
    update(container: Container): void;
}
