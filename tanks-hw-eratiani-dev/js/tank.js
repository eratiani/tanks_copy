import { BaseClass } from "./baseClass.js";

class Tank extends BaseClass {
  constructor(x, y, element) {
    super();
    this.positionX = x;
    this.positionY = y;
    this.health = 3;
    this.movSpeed = 5;
    this.directionsArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.movDirection = "ArrowUp";
    this.domElement = element;
    this.bannedDirection = null;
    this.bulletCount = 2;
  }
  onMove(direction, colision) {
    let newX = this.positionX;
    let newY = this.positionY;
    if (!this.withinGameMap(this.domElement, "gameBorder")) {
      colision = true;
    }
    if (this.stopMovement(direction)) return;
    switch (direction) {
      case "ArrowUp":
        this.movDirection = direction;
        this.domElement.style.transform = "rotate(0deg)";
        if (colision) {
          newY += this.movSpeed * 2;
          this.updateElementPosition(newX, newY);
          this.bannedDirection = direction;
          return;
        } else {
          this.bannedDirection = null;
        }

        newY -= this.movSpeed;
        break;
      case "ArrowDown":
        this.movDirection = direction;

        this.domElement.style.transform = "rotate(180deg)";
        if (colision) {
          newY -= this.movSpeed * 2;
          this.bannedDirection = direction;
          this.updateElementPosition(newX, newY);
          return;
        } else {
          this.bannedDirection = null;
        }

        newY += this.movSpeed;
        break;
      case "ArrowLeft":
        this.movDirection = direction;

        this.domElement.style.transform = "rotate(-90deg)";
        if (colision) {
          this.bannedDirection = direction;
          newX += this.movSpeed * 2;
          this.updateElementPosition(newX, newY);
          return;
        } else {
          this.bannedDirection = null;
        }

        newX -= this.movSpeed;
        break;
      case "ArrowRight":
        this.movDirection = direction;

        this.domElement.style.transform = "rotate(90deg)";
        if (colision) {
          this.bannedDirection = direction;
          newX -= this.movSpeed * 2;
          this.updateElementPosition(newX, newY);
          return;
        } else {
          this.bannedDirection = null;
        }

        newX += this.movSpeed;
        break;

      default:
        break;
    }
    this.updateElementPosition(newX, newY);
  }

  updateElementPosition(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.domElement.style.left = `${this.positionX}px`;
    this.domElement.style.top = `${this.positionY}px`;
  }

  stopMovement(direction) {
    return this.bannedDirection === direction;
  }

  reload() {
    this.bulletCount -= 1;
    setTimeout(() => {
      this.bulletCount += 1;
    }, 3000);
  }
}
export class Player extends Tank {
  constructor(x, y, element) {
    super(x, y, element);
    this.name = "player";
    this.health = 1;
  }
}
export class Bot extends Tank {
  constructor(x, y, element) {
    super(x, y, element);
    this.name = "bot";
    this.botMoveInt = null;
    this.health = 1;
    this.bulletCount = 1;
  }

  move(e, withoutBot, direction) {
    const withoutBullet = withoutBot.filter(
      (e) => e.name !== "bullet" && e.name !== "bot"
    );
    let movDIr = direction;
    const colision = withoutBullet.some((obj) =>
      this.isColiding(e.domElement, obj.domElement)
    );
    if (this.bannedDirection) {
      if (this.bannedDirection) {
        movDIr = this.directionsArr.filter(
          (dir) => dir !== this.bannedDirection
        )[this.randomizer(0, 2)];
      } else {
        movDIr = this.directionsArr[this.randomizer(0, 3)];
      }
      this.onMove(movDIr, colision);
    } else {
      this.bannedDirection = null;
      this.onMove(movDIr, colision);
    }
  }
}
