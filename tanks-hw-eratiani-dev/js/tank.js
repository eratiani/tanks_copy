import { MovingObj } from "./movingObj.js";
export class Tank extends MovingObj {
  constructor(x, y) {
    super(x, y);
    this.health = 21;
    this.movSpeed = 5;
    this.directionsArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    this.movDirection = "ArrowDown";
    this.bannedDirection = null;
    this.bulletCount = 1;
    this.width = 64;
    this.height = 64;
  }

  move(direction) {
    let newX = this.positionX;
    let newY = this.positionY;
    switch (direction) {
      case "ArrowUp":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(0deg)";
        newY -= this.movSpeed;
        break;
      case "ArrowDown":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(180deg)";
        newY += this.movSpeed;
        break;
      case "ArrowLeft":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(-90deg)";
        newX -= this.movSpeed;
        break;
      case "ArrowRight":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(90deg)";
        newX += this.movSpeed;
        break;
      default:
        break;
    }

    this.updateElementPosition(newX, newY);
  }
  changeDirection(bannedDirection) {
    const directionsArr = this.directionsArr.filter(
      (dir) => dir !== bannedDirection
    );
    return directionsArr[this.randomizer(0, 2)];
  }
  reload() {
    this.bulletCount -= 1;
    setTimeout(() => {
      this.bulletCount += 1;
    }, 3000);
  }
}
