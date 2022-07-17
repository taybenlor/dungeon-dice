import type { IconName } from "./elements/icon-element";

export type Effect =
  | "damage"
  | "shield"
  | "heal"
  | "backfire"
  | "money"
  | "blank";

export type Side = {
  effect: Effect;
  amount: number;
  icon: IconName;
};

export type Die = {
  name: string;
  sides: [Side, Side, Side, Side, Side, Side];
  color: string;
  background: string;
  cost: number;
};

export type Roll = Array<[Die, Side]>;

export type Creature = {
  name: string;
  health: number;
  deck: Array<Die>;
  handSize: number;
};

export type Monster = Creature & {
  reward: number;
};

export type Player = Creature & {
  name: "Player";
  money: number;
  rolls: number;
};

export type Round = {
  playerRoll: Roll;
  monsterRoll: Roll;
  player: Player;
  monster: Creature;
};

export type Match = {
  rounds: Array<Round>;
};

export type Quest = {
  name: string;
  encounters: Array<Monster>;
  loot: Array<Die>;
};
