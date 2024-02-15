import { BaseClass } from "./baseClass.js";

export class Bullet extends BaseClass {
  constructor(x, y, element, direction, shotBy) {
    super();
    this.positionX = x;
    this.positionY = y;
    this.domElement = element;
    this.movDirection = direction;
    this.movSpeed = 10;
    this.shotBy = shotBy;
    this.health = 1;
    this.name = "bullet";
  }
  onMove(direction, colidedWith) {
    let newX = this.positionX;
    let newY = this.positionY;
    if (colidedWith.length !== 0) {
      this.health -= 1;
      colidedWith[0].onHit();
      return;
    }
    switch (direction) {
      case "ArrowUp":
        this.movDirection = direction;
        newY -= this.movSpeed;
        break;
      case "ArrowDown":
        newY += this.movSpeed;
        break;
      case "ArrowLeft":
        newX -= this.movSpeed;
        break;
      case "ArrowRight":
        newX += this.movSpeed;
        break;

      default:
        break;
    }
    this.updateElementPosition(newX, newY);
  }
  move(e, withoutBot, direction) {
    const colidedWith = withoutBot.filter((obj) =>
      this.isColiding(e.domElement, obj.domElement, "bullet")
    );
    this.onMove(direction, colidedWith);
  }
  updateElementPosition(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.domElement.style.left = `${this.positionX}px`;
    this.domElement.style.top = `${this.positionY}px`;
  }
  onHit() {
    this.health -= 1;
  }
}
