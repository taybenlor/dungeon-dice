import { ARMOR_DIE, KNIFE_DIE, SHIELD_DIE, SWORD_DIE } from "./dice";
import { Player } from "./types";

export const START_DECK = [
  { ...KNIFE_DIE },
  { ...KNIFE_DIE },
  { ...ARMOR_DIE },
];

export const PLAYER: Player = {
  name: "Player",
  health: 10,
  deck: START_DECK,
  handSize: 2,
  money: 3,
  rolls: 2,
};

export const TEST_PLAYER: Player = {
  name: "Player",
  health: 50,
  deck: [
    { ...SWORD_DIE },
    { ...SWORD_DIE },
    { ...SWORD_DIE },
    { ...SHIELD_DIE },
    { ...SHIELD_DIE },
    { ...SHIELD_DIE },
  ],
  handSize: 4,
  money: 50,
  rolls: 5,
};
