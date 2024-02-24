import { Tank } from "./tank.js";
import { IS_GAME_OVER, PLAYER_LIFE_COUNT } from "./main.js";

export class Player extends Tank {
  constructor(x, y) {
    super(x, y);
    this._domeEl.classList.add("game-object__player-tank");
    this.movDirection = "ArrowUp";
    this.health = PLAYER_LIFE_COUNT[0];
    this.bulletCount = 2;
    this.resPawned = false;
    this.width = 63;
    this.height = 63;
  }
  move(direction, colision) {
    let newX = this.positionX;
    let newY = this.positionY;
    switch (direction) {
      case "ArrowUp":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(0deg)";
        if (colision) return;

        newY -= this.movSpeed;
        break;
      case "ArrowDown":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(180deg)";
        if (colision) return;

        newY += this.movSpeed;
        break;
      case "ArrowLeft":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(-90deg)";
        if (colision) return;

        newX -= this.movSpeed;
        break;
      case "ArrowRight":
        this.movDirection = direction;
        this._domeEl.style.transform = "rotate(90deg)";
        if (colision) return;

        newX += this.movSpeed;
        break;
      default:
        break;
    }
    this.updateElementPosition(newX, newY);
  }
  hit() {
    this.health -= 1;
    PLAYER_LIFE_COUNT[0] -= 1;
    if (this.health > 0) {
      this.spawnPlayer();
    }
  }
  update() {
    if (this.health <= 0) {
      this.endgameMessage("Loose!!!");
      this.deleteObj(this);
      IS_GAME_OVER[0] = true;
    }
  }
}
