import { Die, Side } from "./types";

export const BLANK_SIDE: Side = { effect: "blank", amount: 0 };
export const BLANK_DIE: Die = {
  name: "Blank",
  color: "white",
  background: "white",
  sides: [
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const KNIFE_DIE: Die = {
  name: "Knife",
  color: "gray",
  background: "white",
  sides: [
    {
      effect: "damage",
      amount: 2,
    },
    {
      effect: "damage",
      amount: 1,
    },
    {
      effect: "damage",
      amount: 1,
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

const SHIELD_SIDE: Side = {
  effect: "shield",
  amount: 1,
};
export const SHIELD_DIE: Die = {
  name: "Shield",
  color: "brown",
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

export const POTION_DIE: Die = {
  name: "Potion",
  color: "pink",
  background: "white",
  sides: [
    {
      effect: "heal",
      amount: 3,
    },
    {
      effect: "heal",
      amount: 2,
    },
    {
      effect: "heal",
      amount: 1,
    },
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};

export const LOOKUP = {
  blank: BLANK_DIE,
  knife: KNIFE_DIE,
  shield: SHIELD_DIE,
  potion: POTION_DIE,
};

export type DieName = keyof typeof LOOKUP;
