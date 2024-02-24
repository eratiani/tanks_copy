import { Tank } from "./tank.js";
import { ENEMY_TANKS_COUNT, IS_GAME_OVER } from "./main.js";
import { Bullet } from "./bullet.js";
import { Player } from "./player.js";

export class Bot extends Tank {
  constructor(x, y) {
    super(x, y);
    this._domeEl.classList.add("game-object__enemy-tank");
    this.bulletCount = 1;
  }
  update(collision) {
    if (ENEMY_TANKS_COUNT[0] <= 0) {
      this.endgameMessage("WIN !!!");
      this.deleteObj(this);
      IS_GAME_OVER[0] = true;
    }
    if (collision && collision instanceof Player) {
      this.bulletCount += 1;
    }
    if (this.bulletCount > 0) {
      const bullet = new Bullet(
        this.positionX,
        this.positionY,
        this.movDirection,
        this.constructor.name
      );
      this.gameObjs.push(bullet);
      this.reload();
    }

    if (collision && !(collision instanceof Bullet)) {
      this.movDirection = this.changeDirection(this.movDirection);
      ////// need to check colision again so need to call update method with collision again how?
      return;
    } else {
      this.move(this.movDirection);
    }
  }
  hit() {
    ENEMY_TANKS_COUNT[0] -= 1;
    if (ENEMY_TANKS_COUNT[0] <= 2 && ENEMY_TANKS_COUNT[0] >= 1) {
      this.deleteObj(this);
    }
    if (ENEMY_TANKS_COUNT[0] >= 3) {
      this.spawnBot();
    }
  }
}
