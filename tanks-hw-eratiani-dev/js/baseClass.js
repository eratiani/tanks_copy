import { gameArr } from "./main.js";

export class BaseClass {
  _domeEl = document.createElement("div");
  constructor(x, y) {
    this.positionX = x;
    this.positionY = y;
    this.gameObjs = gameArr;
    this._domeEl.classList.add("game-object");
    this.spawnPointsX = [64, 384, 836];
    this.playerSpawn = [324, 896];
    this.draw(x, y);
  }
  update() {}
  draw(x, y) {
    this._domeEl.style.left = `${x}px`;
    this._domeEl.style.top = `${y}px`;
    document.getElementById("game-map").append(this._domeEl);
  }
  hit() {
    this.health -= 1;
  }
  randomizer(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  deleteObj(obj) {
    this._domeEl.remove();
    let indexToRemove = gameArr.indexOf(obj);
    gameArr.splice(indexToRemove, 1);
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
