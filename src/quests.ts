import type { Quest } from "./types";
import {
  BABY_DRAGON,
  DRAGON,
  DRAKE,
  ELDER_DRAGON,
  GIANT_SPIDER,
  GOBLIN,
  GOBLIN_BERSERKER,
  GOBLIN_CLERIC,
  GOBLIN_LEADER,
  POISON_TOAD,
  RAT,
  RAT_KING,
  SNAKE,
  SPIDER,
} from "./monsters";
import {
  BLESSED_SHIELD_DIE,
  CHEAP_POTION_DIE,
  CURSED_SHIELD_DIE,
  FIREBREATH_DIE,
  FIRESHOT_DIE,
  LOOT_DIE,
  POISON_DIE,
} from "./dice";

export const SEWER: Quest = {
  name: "Sewer",
  encounters: [{ ...RAT }, { ...SPIDER }, { ...RAT_KING }],
  loot: [{ ...CURSED_SHIELD_DIE }, { ...CURSED_SHIELD_DIE }],
};

export const JUNGLE: Quest = {
  name: "Jungle",
  encounters: [{ ...SNAKE }, { ...POISON_TOAD }, { ...GIANT_SPIDER }],
  loot: [{ ...CHEAP_POTION_DIE }, { ...CURSED_SHIELD_DIE }],
};

export const ABANDONED_MINE: Quest = {
  name: "Abandoned Mine",
  encounters: [{ ...SPIDER }, { ...GOBLIN }, { ...GOBLIN_LEADER }],
  loot: [{ ...POISON_DIE }, { ...FIRESHOT_DIE }],
};

export const CURSED_TEMPLE: Quest = {
  name: "Cursed Temple",
  encounters: [
    { ...GOBLIN_CLERIC },
    { ...SNAKE },
    { ...GOBLIN_CLERIC },
    { ...BABY_DRAGON },
  ],
  loot: [{ ...BLESSED_SHIELD_DIE }, { ...BLESSED_SHIELD_DIE }],
};

export const GOBLIN_CAMP: Quest = {
  name: "Goblin Camp",
  encounters: [{ ...GOBLIN }, { ...GOBLIN_BERSERKER }, { ...GOBLIN_LEADER }],
  loot: [{ ...CURSED_SHIELD_DIE }, { ...CHEAP_POTION_DIE }],
};

export const DRAGONS_NEST: Quest = {
  name: "Dragons Nest",
  encounters: [
    DRAKE,
    { ...BABY_DRAGON },
    { ...SNAKE },
    { ...BABY_DRAGON },
    { ...DRAGON },
  ],
  loot: [{ ...FIRESHOT_DIE }, { ...FIREBREATH_DIE }],
};

export const DRAGONS_HORDE: Quest = {
  name: "Dragons Horde",
  encounters: [
    { ...GIANT_SPIDER },
    { ...GOBLIN_LEADER },
    { ...BABY_DRAGON },
    { ...DRAGON },
    { ...ELDER_DRAGON },
  ],
  loot: [{ ...FIREBREATH_DIE }, { ...LOOT_DIE }, { ...LOOT_DIE }],
};
