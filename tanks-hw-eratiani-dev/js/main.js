import { Bullet } from "./bullet.js";
import { Bot, Player } from "./tank.js";
import { GameRoom } from "./gameRoom.js";
const GAME_TIMER_INTERVAL = 50; // sets the time interval during which one step in the game will be performed
let PLAYER_LIFE_COUNT = 3;
let ENEMY_TANKS_COUNT = 21;
let IS_GAME_OVER = false;
let IS_GAME_Started = false;
let playerLifeCont = document.getElementById("player--life");
let tankCountCont = document.getElementById("tank--count");
let currGame = [];
let player = null;
const playerActionHandler = (e) => {
  player = currGame.finGameObj("player")[0];
  const withoutPlayer = currGame.gameObjs.filter((obj) => obj != player);
  const colision = withoutPlayer.some((obj) =>
    currGame.isColiding(player.domElement, obj.domElement)
  );
  player.onMove(e.key, colision);
  if (e.key === " " && player.bulletCount > 0) {
    const bullDIr = player.movDirection;
    currGame.drawBullet(bullDIr, player, "player");
    player.reload();
  }
};
/**
 * in this function you can execute all the code that is necessary to start the game
 * for example, it is in this place that you can draw wall blocks on the map and subscribe to events when control buttons are pressed
 */
gameInitialization();

/**
 * Game life cycle
 * calls the gameLoop function every GAME_TIMER_INTERVAL until the game ends
 * (to end the game, set IS_GAME_OVER to true)
 */
gameLoop();

function gameInitialization() {
  const game = new GameRoom();
  game.init();
  currGame = game;
}

function gameLoop() {
  if (PLAYER_LIFE_COUNT <= 0 || ENEMY_TANKS_COUNT <= 0) {
    document.removeEventListener("keydown", playerActionHandler);
    let message = "win";
    IS_GAME_OVER = true;
    if (PLAYER_LIFE_COUNT <= 0) {
      message = "loose";
    }
    currGame.endgameMessage(message);
  }
  if (!IS_GAME_Started) {
    document.addEventListener("keydown", playerActionHandler);

    IS_GAME_Started = !IS_GAME_Started;
  }
  if (IS_GAME_OVER !== true) {
    /**
     * it is in the gameStep function that you should place the code that will be executed at each step of the game loop
     */
    gameStep();

    setTimeout(function () {
      gameLoop();
    }, GAME_TIMER_INTERVAL);
  }
}

function gameStep() {
  tankCountCont.textContent = ENEMY_TANKS_COUNT;
  playerLifeCont.textContent = PLAYER_LIFE_COUNT;

  currGame.gameObjs.forEach((obj) => {
    if (
      !currGame.withinGameMap(obj.domElement, "bullet") &&
      obj.name === "bullet"
    ) {
      obj.onHit();
    }
    if (obj.name === "bot" || obj.name === "bullet") {
      const whithoutCurrObj = currGame.gameObjs.filter(
        (el) => el !== obj && obj.shotBy !== el.name
      );
      obj.move(obj, whithoutCurrObj, obj.movDirection);
      if (obj.name === "bot" && obj.bulletCount > 0) {
        currGame.drawBullet(obj.movDirection, obj, "bot");
        obj.reload();
      }
    }
    if (obj.name === "wall") {
      obj.updatewall();
    }
    currGame.destroyObj(obj);
  });
  currGame.gameObjs.filter((obj) => obj.name === "bot").length < 3 &&
    spawnBot();
  let player = currGame.gameObjs.filter((obj) => obj.name === "player");
  player.length < 1 && spawnPlayer();
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
function spawnBot() {
  ENEMY_TANKS_COUNT -= 1;
  tankCountCont.textContent = ENEMY_TANKS_COUNT;
  if (ENEMY_TANKS_COUNT <= 0) return;
  const [botEl, x, y] = currGame.spawnBot();
  const bot = new Bot(x, y, botEl);
  currGame.addObjToGame(bot);
}
function spawnPlayer() {
  PLAYER_LIFE_COUNT -= 1;
  playerLifeCont.textContent = PLAYER_LIFE_COUNT;
  if (PLAYER_LIFE_COUNT <= 0) return;
  const [playerEl, x, y] = currGame.spawnPlayer();
  const player = new Player(x, y, playerEl);
  currGame.addObjToGame(player);
}
