import { Player } from "./player.js";
import { Wall } from "./wall.js";
import { Bot } from "./bot.js";
import { EpicWall } from "./epic-wall.js";

export const MAP = [
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 2, 0, 0, 3, 0, 0, 2, 0, 0, 3, 0, 0, 2, 4],
  [4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4],
  [4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4],
  [4, 0, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 0, 0, 4],
  [4, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [4, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 4],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 3, 3, 3, 3, 0, 3, 3, 3, 3, 0, 0, 4],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 4],
  [4, 0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
];

export const MAP_LEGEND = {
  1: Player,
  2: Bot,
  3: Wall,
  4: EpicWall,
};
