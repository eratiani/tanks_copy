import { Bot } from "./bot.js";
import { MovingObj } from "./movingObj.js";
import { Player } from "./player.js";

export class Bullet extends MovingObj {
  constructor(x, y, direction, createdBy) {
    super(x, y);
    this.movDirection = direction;
    this.movSpeed = 9;
    this.width = 5;
    this.height = 5;
    this.createdBy = createdBy;
    this._domeEl.classList.add("game-object__bullet");
    this.drawBullet(this.movDirection);
  }
  update(collision) {
    if (collision) {
      this.deleteObj(this);
      if (
        collision.isDestructable ||
        this.createdBy === collision.constructor.name
      )
        return;
      collision.hit();
      return;
    }
    this.move(this.movDirection);
  }

  move(direction) {
    let newX = this.positionX;
    let newY = this.positionY;
    switch (direction) {
      case "ArrowUp":
        this.movDirection = direction;
        newY -= this.movSpeed;
        break;
      case "ArrowDown":
        this.movDirection = direction;
        newY += this.movSpeed;
        break;
      case "ArrowLeft":
        this.movDirection = direction;
        newX -= this.movSpeed;
        break;
      case "ArrowRight":
        this.movDirection = direction;
        newX += this.movSpeed;
        break;
      default:
        break;
    }

    this.updateElementPosition(newX, newY);
  }
  isColiding(arr, dir) {
    const target = arr.filter((e) => e !== this);
    let nextX = this.positionX;
    let nextY = this.positionY;

    return target.find((currEl) => {
      return this.collision(nextX, nextY, currEl);
    });
  }
}
