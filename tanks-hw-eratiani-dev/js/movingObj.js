import { BaseClass } from "./baseClass.js";

export class MovingObj extends BaseClass {
  constructor(x, y) {
    super(x, y);
  }
  isColiding(arr, dir) {
    const target = arr.filter((e) => e !== this);
    let nextX = this.positionX;
    let nextY = this.positionY;

    switch (dir) {
      case "ArrowUp":
        nextY -= 5;
        break;
      case "ArrowDown":
        nextY += 5;
        break;
      case "ArrowLeft":
        nextX -= 5;
        break;
      case "ArrowRight":
        nextX += 5;
        break;

      default:
        break;
    }
    return target.find((currEl) => {
      return this.collision(nextX, nextY, currEl);
    });
  }
  collision(x, y, target) {
    let width = this.width - 4;
    let height = this.height - 4;
    const condition =
      x + height > target.positionX &&
      x < target.positionX + target.height &&
      y + width > target.positionY &&
      y < target.positionY + target.width;
    if (condition) {
      return target;
    } else {
      return false;
    }
  }
  spawnBot() {
    let randomX = this.spawnPointsX[this.randomizer(0, 2)];
    let y = 64;
    this.updateElementPosition(randomX, y);
  }
  spawnPlayer() {
    let x = this.playerSpawn[0];
    let y = this.playerSpawn[1];
    this.updateElementPosition(x, y);
  }
  move() {}
  updateElementPosition(x, y) {
    this.positionX = x;
    this.positionY = y;
    this._domeEl.style.left = `${this.positionX}px`;
    this._domeEl.style.top = `${this.positionY}px`;
  }
  drawBullet(bulletDir) {
    let modifierX = this.positionX;
    let modifierY = this.positionY;
    switch (bulletDir) {
      case "ArrowUp":
        modifierX = 28;
        modifierY = -28;
        break;
      case "ArrowDown":
        modifierX = 28;
        modifierY = 74;
        break;
      case "ArrowLeft":
        modifierX = -28;
        modifierY = 28;
        break;
      case "ArrowRight":
        modifierX = 74;
        modifierY = 28;
        break;

      default:
        break;
    }
    this.positionX += modifierX;
    this.positionY += modifierY;
    this.draw(this.positionX, this.positionY);
  }
}
