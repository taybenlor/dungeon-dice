import {
  ARMOR_DIE,
  AXE_DIE,
  BITE_DIE,
  BLANK_DIE,
  CHOMP_DIE,
  CURSED_SHIELD_DIE,
  FEED_DIE,
  FIREBREATH_DIE,
  KNIFE_DIE,
  POISON_DIE,
  POTION_DIE,
  RECOVER_DIE,
} from "./dice";
import { Monster } from "./types";

//
// Animals
//

export const RAT: Monster = {
  name: "Rat",
  health: 3,
  deck: [{ ...CHOMP_DIE }, { ...CHOMP_DIE }, { ...BLANK_DIE }],
  handSize: 1,
  reward: 1,
};

export const RAT_KING: Monster = {
  name: "Rat King",
  health: 8,
  deck: [
    { ...BITE_DIE },
    { ...CHOMP_DIE },
    { ...CHOMP_DIE },
    { ...CHOMP_DIE },
    { ...FEED_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 1,
  reward: 3,
};

export const POISON_TOAD: Monster = {
  name: "Poison Toad",
  health: 8,
  deck: [
    { ...POISON_DIE },
    { ...POISON_DIE },
    { ...FEED_DIE },
    { ...FEED_DIE },
    { ...FEED_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 3,
};

export const SPIDER: Monster = {
  name: "Spider",
  health: 6,
  deck: [
    { ...POISON_DIE },
    { ...POISON_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 1,
  reward: 2,
};

export const GIANT_SPIDER: Monster = {
  name: "Giant Spider",
  health: 12,
  deck: [
    { ...POISON_DIE },
    { ...POISON_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 4,
};

//
// Goblins
//

export const GOBLIN: Monster = {
  name: "Goblin",
  health: 10,
  deck: [
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...ARMOR_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 3,
};

export const GOBLIN_CLERIC: Monster = {
  name: "Goblin Cleric",
  health: 8,
  deck: [
    { ...KNIFE_DIE },
    { ...KNIFE_DIE },
    { ...POTION_DIE },
    { ...POTION_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 3,
};

export const GOBLIN_BERSERKER: Monster = {
  name: "Goblin Berserker",
  health: 10,
  deck: [
    { ...AXE_DIE },
    { ...AXE_DIE },
    { ...AXE_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 3,
};

export const GOBLIN_LEADER: Monster = {
  name: "Goblin Leader",
  health: 12,
  deck: [
    { ...AXE_DIE },
    { ...AXE_DIE },
    { ...CURSED_SHIELD_DIE },
    { ...CURSED_SHIELD_DIE },
    { ...POTION_DIE },
  ],
  handSize: 2,
  reward: 4,
};

//
// Dragons
//

export const SNAKE: Monster = {
  name: "Snake",
  health: 5,
  deck: [
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 2,
};

export const DRAKE: Monster = {
  name: "Drake",
  health: 14,
  deck: [
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...FIREBREATH_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 4,
};

export const BABY_DRAGON: Monster = {
  name: "Baby Dragon",
  health: 22,
  deck: [
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...FIREBREATH_DIE },
    { ...FIREBREATH_DIE },
    { ...RECOVER_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
  reward: 7,
};

export const DRAGON: Monster = {
  name: "Dragon",
  health: 30,
  deck: [
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...FIREBREATH_DIE },
    { ...FIREBREATH_DIE },
    { ...FIREBREATH_DIE },
    { ...RECOVER_DIE },
    { ...RECOVER_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 3,
  reward: 10,
};

export const ELDER_DRAGON: Monster = {
  name: "Elder Dragon",
  health: 48,
  deck: [
    { ...BITE_DIE },
    { ...FIREBREATH_DIE },
    { ...FIREBREATH_DIE },
    { ...FIREBREATH_DIE },
    { ...FIREBREATH_DIE },
    { ...RECOVER_DIE },
    { ...RECOVER_DIE },
    { ...RECOVER_DIE },
    { ...RECOVER_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 4,
  reward: 15,
};
