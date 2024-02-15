import { BaseClass } from "./baseClass.js";
import { MAP as newMap, MAP_LEGEND } from "./map.js";
import { Player, Bot } from "./tank.js";
import { Wall } from "./wall.js";
import { Bullet } from "./bullet.js";
export class GameRoom extends BaseClass {
  constructor() {
    super();
    this.gameMap = newMap;
  }
  init() {
    this.gameMap.forEach((e, i) => {
      this.renderElements(e);
      if (i % 13 === 0 && i !== 0) {
        this.positionX = 0;
        this.positionY += 64;
      } else {
        this.positionX += 64;
      }
    });
  }
  renderElements(type) {
    if (type === MAP_LEGEND.PLAYER_BASE) {
      const playerEl = this.draw(
        this.positionX,
        this.positionY,
        "game-object__player-tank"
      );

      const playerTank = new Player(this.positionX, this.positionY, playerEl);
      this.addObjToGame(playerTank);
    }
    if (type === MAP_LEGEND.ENEMY_BASE) {
      const botEl = this.draw(
        this.positionX,
        this.positionY,
        "game-object__enemy-tank"
      );
      const bot = new Bot(this.positionX, this.positionY, botEl);
      this.addObjToGame(bot);
    }
    if (type === MAP_LEGEND.WALL) {
      const wallEl = this.draw(
        this.positionX,
        this.positionY,
        "game-object__wall"
      );
      const newWall = new Wall(this.positionX, this.positionY, wallEl);
      this.addObjToGame(newWall);
    }
  }
  drawBullet(bulletDir, shotByObj, shotBy) {
    let modifierX = 0;
    let modifierY = 0;
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
    const bulletEl = this.draw(
      shotByObj.positionX + modifierX,
      shotByObj.positionY + modifierY,
      "game-object__bullet"
    );

    const bullet = new Bullet(
      shotByObj.positionX + modifierX,
      shotByObj.positionY + modifierY,
      bulletEl,
      bulletDir,
      shotBy
    );
    this.addObjToGame(bullet);
    return bullet;
  }
}
