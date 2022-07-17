import {
  ARMOR_DIE,
  AXE_DIE,
  BITE_DIE,
  BLANK_DIE,
  CHOMP_DIE,
  CURSED_SHIELD_DIE,
  DEATHBEAM_DIE,
  FEED_DIE,
  FIREBREATH_DIE,
  KNIFE_DIE,
  LOOT_DIE,
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
    { ...LOOT_DIE },
    { ...LOOT_DIE },
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
    { ...DEATHBEAM_DIE },
    { ...DEATHBEAM_DIE },
  ],
  handSize: 4,
  reward: 15,
};

import babyDragonURL from "./assets/monsters/baby-dragon.gif";
import dragonURL from "./assets/monsters/dragon.gif";
import drakeURL from "./assets/monsters/drake.gif";
import elderDragonURL from "./assets/monsters/elder-dragon.gif";
import giantSpiderURL from "./assets/monsters/giant-spider.gif";
import goblinBerserkerURL from "./assets/monsters/goblin-berserker.gif";
import goblinClericURL from "./assets/monsters/goblin-cleric.gif";
import goblinLeaderURL from "./assets/monsters/goblin-leader.gif";
import goblinURL from "./assets/monsters/goblin.gif";
import poisonToadURL from "./assets/monsters/poison-toad.gif";
import ratKingURL from "./assets/monsters/rat-king.gif";
import ratURL from "./assets/monsters/rat.gif";
import snakeURL from "./assets/monsters/snake.gif";
import spiderURL from "./assets/monsters/spider.gif";

export const MONSTER_PICS = {
  [BABY_DRAGON.name]: babyDragonURL,
  [DRAGON.name]: dragonURL,
  [DRAKE.name]: drakeURL,
  [ELDER_DRAGON.name]: elderDragonURL,
  [GIANT_SPIDER.name]: giantSpiderURL,
  [GOBLIN_BERSERKER.name]: goblinBerserkerURL,
  [GOBLIN_CLERIC.name]: goblinClericURL,
  [GOBLIN_LEADER.name]: goblinLeaderURL,
  [GOBLIN.name]: goblinURL,
  [POISON_TOAD.name]: poisonToadURL,
  [RAT_KING.name]: ratKingURL,
  [RAT.name]: ratURL,
  [SNAKE.name]: snakeURL,
  [SPIDER.name]: spiderURL,
};
