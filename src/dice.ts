import { Die, Side } from "./types";

export const BLANK_SIDE: Side = { effect: "blank", amount: 0, icon: "Blank" };
export const BLANK_DIE: Die = {
  name: "Blank",
  color: "white",
  background: "white",
  cost: 0,
  sides: [
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

//
// Weapons
//

export const KNIFE_DIE: Die = {
  name: "Knife",
  cost: 1,
  color: "#c2cbda",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 2,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const STAFF_DIE: Die = {
  name: "Staff",
  cost: 2,
  color: "#c2cbda",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    BLANK_SIDE,
  ],
};

export const SWORD_DIE: Die = {
  name: "Sword",
  cost: 6,
  color: "white",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 4,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 2,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 2,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Damage",
    },
    BLANK_SIDE,
  ],
};

export const AXE_DIE: Die = {
  name: "Axe",
  cost: 5,
  color: "white",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 5,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 2,
      icon: "Damage",
    },
    {
      effect: "damage",
      amount: 2,
      icon: "Damage",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const BOW_DIE: Die = {
  name: "Bow",
  cost: 4,
  color: "#e0a875",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 5,
      icon: "Bow",
    },
    {
      effect: "damage",
      amount: 5,
      icon: "Bow",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

//
// Armor
//

const SHIELD_SIDE: Side = {
  effect: "shield",
  amount: 1,
  icon: "Shield",
};

export const ARMOR_DIE: Die = {
  name: "Armor",
  cost: 1,
  color: "#272b42",
  background: "white",
  sides: [
    SHIELD_SIDE,
    SHIELD_SIDE,
    SHIELD_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const HELMET_DIE: Die = {
  name: "Helmet",
  cost: 2,
  color: "#272b42",
  background: "white",
  sides: [
    {
      effect: "shield",
      amount: 2,
      icon: "Shield",
    },
    {
      effect: "shield",
      amount: 2,
      icon: "Shield",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const SHIELD_DIE: Die = {
  name: "Shield",
  cost: 5,
  color: "#272b42",
  background: "white",
  sides: [
    SHIELD_SIDE,
    SHIELD_SIDE,
    SHIELD_SIDE,
    SHIELD_SIDE,
    SHIELD_SIDE,
    BLANK_SIDE,
  ],
};

export const BLESSED_SHIELD_DIE: Die = {
  name: "Blessed Shield",
  cost: 0,
  color: "#cda400",
  background: "white",
  sides: [
    {
      effect: "shield",
      amount: 2,
      icon: "Shield",
    },
    SHIELD_SIDE,
    SHIELD_SIDE,
    SHIELD_SIDE,
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    BLANK_SIDE,
  ],
};

export const CURSED_SHIELD_DIE: Die = {
  name: "Cursed Shield",
  cost: 0,
  color: "#4a936d",
  background: "white",
  sides: [
    {
      effect: "shield",
      amount: 2,
      icon: "Shield",
    },
    SHIELD_SIDE,
    SHIELD_SIDE,
    SHIELD_SIDE,
    BLANK_SIDE,
    {
      effect: "backfire",
      amount: 3,
      icon: "Unheal",
    },
  ],
};

//
// Potions
//

export const POTION_DIE: Die = {
  name: "Small Potion",
  cost: 3,
  color: "#d65241",
  background: "white",
  sides: [
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const LARGE_POTION_DIE: Die = {
  name: "Large Potion",
  cost: 6,
  color: "#d65241",
  background: "white",
  sides: [
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const CHEAP_POTION_DIE: Die = {
  name: "Cheap Potion",
  cost: 3,
  color: "#4a936d",
  background: "white",
  sides: [
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    BLANK_SIDE,
    {
      effect: "backfire",
      amount: 1,
      icon: "Unheal",
    },
  ],
};

//
// Spells
//

export const FIREBALL_DIE: Die = {
  name: "Fireball",
  cost: 9,
  color: "#d65241",
  background: "#fae877",
  sides: [
    {
      effect: "damage",
      amount: 10,
      icon: "Fire",
    },
    {
      effect: "damage",
      amount: 5,
      icon: "Fire",
    },
    {
      effect: "damage",
      amount: 5,
      icon: "Fire",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    {
      effect: "backfire",
      amount: 5,
      icon: "Unheal",
    },
  ],
};

export const FIRESHOT_DIE: Die = {
  name: "Fireshot",
  cost: 0,
  color: "#d65241",
  background: "#fae877",
  sides: [
    {
      effect: "damage",
      amount: 3,
      icon: "Fire",
    },
    {
      effect: "damage",
      amount: 3,
      icon: "Fire",
    },
    {
      effect: "damage",
      amount: 3,
      icon: "Fire",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    {
      effect: "backfire",
      amount: 1,
      icon: "Unheal",
    },
  ],
};

export const DEATHRAY_DIE: Die = {
  name: "Deathray",
  cost: 10,
  color: "#76deb6",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 16,
      icon: "Skull",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const LOOT_DIE: Die = {
  name: "Loot",
  cost: 9,
  color: "#f2b14f",
  background: "#6e3e38",
  sides: [
    {
      effect: "money",
      amount: 2,
      icon: "Money",
    },
    {
      effect: "money",
      amount: 1,
      icon: "Money",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

//
// Monsters
//

export const CHOMP_DIE: Die = {
  name: "Chomp",
  cost: 0,
  color: "white",
  background: "#6e3e38",
  sides: [
    {
      effect: "damage",
      amount: 2,
      icon: "Bite",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Bite",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Bite",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const BITE_DIE: Die = {
  name: "Bite",
  cost: 0,
  color: "white",
  background: "#6e3e38",
  sides: [
    {
      effect: "damage",
      amount: 4,
      icon: "Bite",
    },
    {
      effect: "damage",
      amount: 2,
      icon: "Bite",
    },
    {
      effect: "damage",
      amount: 2,
      icon: "Bite",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const POISON_DIE: Die = {
  name: "Poison",
  cost: 0,
  color: "#76deb6",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 2,
      icon: "Skull",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Skull",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Skull",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Skull",
    },
    {
      effect: "damage",
      amount: 1,
      icon: "Skull",
    },
    BLANK_SIDE,
  ],
};

export const FIREBREATH_DIE: Die = {
  name: "Firebreath",
  cost: 0,
  color: "#d65241",
  background: "#fae877",
  sides: [
    {
      effect: "damage",
      amount: 10,
      icon: "Fire",
    },
    {
      effect: "damage",
      amount: 5,
      icon: "Fire",
    },
    {
      effect: "damage",
      amount: 5,
      icon: "Fire",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const DEATHBEAM_DIE: Die = {
  name: "Deathbeam",
  cost: 0,
  color: "#76deb6",
  background: "#272b42",
  sides: [
    {
      effect: "damage",
      amount: 16,
      icon: "Skull",
    },
    {
      effect: "damage",
      amount: 16,
      icon: "Skull",
    },
    {
      effect: "damage",
      amount: 16,
      icon: "Skull",
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const FEED_DIE: Die = {
  name: "Feed",
  cost: 0,
  color: "#d65241",
  background: "white",
  sides: [
    {
      effect: "heal",
      amount: 2,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 2,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 1,
      icon: "Heal",
    },
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const RECOVER_DIE: Die = {
  name: "Recover",
  cost: 0,
  color: "#d65241",
  background: "white",
  sides: [
    {
      effect: "heal",
      amount: 6,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 6,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    {
      effect: "heal",
      amount: 3,
      icon: "Heal",
    },
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};
