const blocDimensions = 64;
export class BaseClass {
  constructor() {
    this.container = document.getElementById("game-map");
    this.positionX = 0;
    this.positionY = 0;
    this.gameObjs = [];
    this.spawnPointsX = [0, 320, 768];
    this.playerSpawn = [128, 832];
  }

  draw(x, y, className) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(className);
    newDiv.classList.add("game-object");
    newDiv.style.left = `${x}px`;
    newDiv.style.top = `${y}px`;
    this.container.append(newDiv);
    return newDiv;
  }
  isColiding(movingEl, target, type = "tank") {
    const movingRect = movingEl.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    let collisionRadius = 5;
    if (type === "bullet") {
      collisionRadius = 0;
    } else if (type === "gameBorder") {
      collisionRadius = 60;
    }
    return !(
      movingRect.right - collisionRadius <= targetRect.left ||
      movingRect.left + collisionRadius >= targetRect.right ||
      movingRect.bottom - collisionRadius <= targetRect.top ||
      movingRect.top + collisionRadius >= targetRect.bottom
    );
  }
  finGameObj(objName) {
    return this.gameObjs.filter((e) => e.name === objName) || [];
  }
  addObjToGame(obj) {
    this.gameObjs.push(obj);
  }
  onHit() {
    this.health -= 1;
  }
  deleteEl(el) {
    el.domElement.remove();
  }
  destroyObj(el) {
    if (el.health <= 0) {
      this.gameObjs = this.gameObjs.filter((e) => e !== el);
      this.deleteEl(el);
    }
  }
  withinGameMap(movingEl, type = "tank") {
    return this.isColiding(movingEl, this.container, type);
  }
  spawnBot() {
    let randomX = this.spawnPointsX[this.randomizer(0, 2)];
    let y = 0;
    return [this.draw(randomX, y, "game-object__enemy-tank"), randomX, y];
  }
  spawnPlayer() {
    let x = this.playerSpawn[0];
    let y = this.playerSpawn[1];
    return [this.draw(x, y, "game-object__player-tank"), x, y];
  }

  randomizer(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  endgameMessage(message) {
    const container = document.getElementById("game-map");
    const h1Element = document.createElement("h1");
    h1Element.textContent = ` Game Over!!! You  ${message} `;
    h1Element.classList.add("endGame");
    h1Element.style.cursor = "pointer";
    h1Element.addEventListener("click", () => location.reload());
    container.appendChild(h1Element);
  }
}
