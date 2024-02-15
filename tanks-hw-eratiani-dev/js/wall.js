import { BaseClass } from "./baseClass.js";

export class Wall extends BaseClass {
  constructor(x, y, element) {
    super();
    this.health = 3;
    this.positionX = x;
    this.positionY = y;
    this.domElement = element;
    this.name = "wall";
  }
  loverHealth() {
    this.health -= 1;
    return this.health;
  }

  updatewall() {
    if (this.health === 2) {
      this.domElement.classList.add("hit");
    } else if (this.health === 1) {
      this.domElement.classList.add("hardHit");
    }
  }
}
