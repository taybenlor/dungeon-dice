import { KNIFE_DIE, POTION_DIE, SHIELD_DIE } from "./dice";
import { Player } from "./types";

export const START_DECK = [
  { ...KNIFE_DIE },
  { ...KNIFE_DIE },
  { ...SHIELD_DIE },
  { ...POTION_DIE },
];

export const PLAYER: Player = {
  name: "Player",
  health: 10,
  deck: START_DECK,
  handSize: 3,
};
