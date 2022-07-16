import { Die, Side } from "./types";

export const BLANK_SIDE: Side = { effect: "blank", amount: 0, icon: "Blank" };
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
  color: "#888",
  background: "#555",
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

const SHIELD_SIDE: Side = {
  effect: "shield",
  amount: 1,
  icon: "Shield",
};
export const SHIELD_DIE: Die = {
  name: "Shield",
  color: "#888",
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
  color: "darkred",
  background: "pink",
  sides: [
    {
      effect: "heal",
      amount: 3,
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
    BLANK_SIDE,
    BLANK_SIDE,
    BLANK_SIDE,
  ],
};
