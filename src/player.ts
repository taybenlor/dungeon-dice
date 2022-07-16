import { ARMOR_DIE, KNIFE_DIE, POTION_DIE } from "./dice";
import { Player } from "./types";

export const START_DECK = [
  { ...KNIFE_DIE },
  { ...KNIFE_DIE },
  { ...ARMOR_DIE },
  { ...ARMOR_DIE },
  { ...POTION_DIE },
];

export const PLAYER: Player = {
  name: "Player",
  health: 10,
  deck: START_DECK,
  handSize: 3,
};
