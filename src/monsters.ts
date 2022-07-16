import { BLANK_DIE, KNIFE_DIE, POTION_DIE } from "./dice";
import { Creature } from "./types";

export const GOBLIN: Creature = {
  name: "Goblin",
  health: 8,
  deck: [
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
};

export const GOBLIN_CLERIC: Creature = {
  name: "Goblin Cleric",
  health: 6,
  deck: [
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...POTION_DIE },
    { ...POTION_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
};
