import { Wall } from "./wall.js";

export class EpicWall extends Wall {
  constructor(x, y) {
    super(x, y);
    this.isDestructable = true;
    this._domeEl.classList.add("game-object__Big-wall");
  }
}
