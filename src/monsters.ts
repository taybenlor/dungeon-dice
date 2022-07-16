import {
  AXE_DIE,
  BITE_DIE,
  BLANK_DIE,
  CURSED_SHIELD_DIE,
  FEED_DIE,
  FIREBREATH_DIE,
  KNIFE_DIE,
  POISON_DIE,
  POTION_DIE,
  RECOVER_DIE,
} from "./dice";
import { Creature } from "./types";

//
// Animals
//

export const RAT: Creature = {
  name: "Rat",
  health: 3,
  deck: [{ ...BITE_DIE }, { ...BLANK_DIE }],
  handSize: 1,
};

export const RAT_KING: Creature = {
  name: "Rat King",
  health: 8,
  deck: [
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...BITE_DIE },
    { ...FEED_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 1,
};

export const POISON_TOAD: Creature = {
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
};

export const SPIDER: Creature = {
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
};

export const GIANT_SPIDER: Creature = {
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
};

//
// Goblins
//

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

export const GOBLIN_BERSERKER: Creature = {
  name: "Goblin Berserker",
  health: 8,
  deck: [
    { ...AXE_DIE },
    { ...AXE_DIE },
    { ...AXE_DIE },
    { ...BLANK_DIE },
    { ...BLANK_DIE },
  ],
  handSize: 2,
};

export const GOBLIN_LEADER: Creature = {
  name: "Goblin Leader",
  health: 10,
  deck: [
    { ...AXE_DIE },
    { ...AXE_DIE },
    { ...CURSED_SHIELD_DIE },
    { ...CURSED_SHIELD_DIE },
    { ...POTION_DIE },
  ],
  handSize: 2,
};

//
// Dragons
//

export const SNAKE: Creature = {
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
};

export const DRAKE: Creature = {
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
};

export const BABY_DRAGON: Creature = {
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
};

export const DRAGON: Creature = {
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
};

export const ELDER_DRAGON: Creature = {
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
};
