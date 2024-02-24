import { Bullet } from "./bullet.js";
import { MAP, MAP_LEGEND } from "./map.js";
import { MovingObj } from "./movingObj.js";
import { Player } from "./player.js";
const GAME_TIMER_INTERVAL = 40; // sets the time interval during which one step in the game will be performed
export let PLAYER_LIFE_COUNT = [3];
export let ENEMY_TANKS_COUNT = [21];
let currPlayer = null;
export let IS_GAME_OVER = [false];
let playerLifeCont = document.getElementById("player--life");
let tankCountCont = document.getElementById("tank--count");
export let gameArr = [];
/**
 * in this function you can execute all the code that is necessary to start the game
 * for example, it is in this place that you can draw wall blocks on the map and subscribe to events when control buttons are pressed
 */
const playerActionHandler = (e) => {
  let player = currPlayer;
  const withoutPlayer = gameArr.filter((obj) => obj !== player);
  if (e.key === " " && player.bulletCount > 0) {
    const bullet = new Bullet(
      player.positionX,
      player.positionY,
      player.movDirection,
      player.constructor.name
    );
    gameArr.push(bullet);
    player.reload();
  }
  const isDirection = player.directionsArr.some((el) => el === e.key);
  if (isDirection) {
    player.movDirection = e.key;
  } else {
    return;
  }
  const colision = player.isColiding(withoutPlayer, player.movDirection);

  player.move(e.key, colision);
};
gameInitialization();

/**
 * Game life cycle
 * calls the gameLoop function every GAME_TIMER_INTERVAL until the game ends
 * (to end the game, set IS_GAME_OVER to true)
 */
gameLoop();
function gameInitialization() {
  MAP.forEach((element, i) => {
    for (let index = 0; index < element.length; index++) {
      const arrItem = MAP_LEGEND[element[index]];
      const x = index * 64;
      const y = i * 64;
      const objConstructor = arrItem;
      const gameObj = objConstructor ? new objConstructor(x, y) : null;
      if (gameObj instanceof Player) {
        currPlayer = gameObj;
      }
      if (gameObj) {
        gameArr.push(gameObj);
      }
    }
  });
  document.addEventListener("keydown", playerActionHandler);
}

function gameLoop() {
  if (IS_GAME_OVER[0] !== true) {
    /**
     * it is in the gameStep function that you should place the code that will be executed at each step of the game loop
     */
    gameStep();

    setTimeout(function () {
      gameLoop();
    }, GAME_TIMER_INTERVAL);
  } else {
    document.removeEventListener("keydown", playerActionHandler);
  }
}

function gameStep() {
  tankCountCont.textContent = ENEMY_TANKS_COUNT[0];
  playerLifeCont.textContent = PLAYER_LIFE_COUNT[0];
  gameArr.forEach((obj) => {
    if (obj instanceof MovingObj && !(obj instanceof Player)) {
      const collision = obj.isColiding(gameArr, obj.movDirection);
      obj.update(collision);
    } else {
      obj.update();
    }
  });
  /**
   * this is the place where you should take the main steps of the game cycle
   * for example, it seems to us that we could do the following
   * 1. move bullets
   * 2. calculate where the tanks will end up after this step
   * 3. check collisions (bullets with tanks, bullets with walls, tanks with walls and tanks with tanks)
   * 4. remove dead tanks and destroyed walls from the field
   * 5. check if the player has run out of lives or if the enemy tanks have run out
   * 6. create new tanks at the bases in case someone was killed at this step
   */
}
