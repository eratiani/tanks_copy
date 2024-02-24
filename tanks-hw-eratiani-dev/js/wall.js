import { BaseClass } from "./baseClass.js";

export class Wall extends BaseClass {
  constructor(x, y) {
    super(x, y);
    this._domeEl.classList.add("game-object__wall");
    this.width = 64;
    this.height = 64;
    this.health = 3;
  }
  update() {
    if (this.health <= 0) {
      this.deleteObj(this);
    } else if (this.health === 2) {
      this._domeEl.classList.add("hit");
    } else if (this.health === 1) {
      this._domeEl.classList.add("hardHit");
    }
  }
}
