export type Effect = "damage" | "shield" | "heal" | "blank";

export type Side = {
  effect: Effect;
  amount: number;
};

export type Die = {
  name: string;
  sides: [Side, Side, Side, Side, Side, Side];
  color: string;
  background: string;
};

export type Roll = Array<Side>;

export type Creature = {
  name: string;
  health: number;
  shield: number;
  deck: Array<Die>;
};

export type Round = {
  attacker: Creature;
  defender: Creature;
  roll: Roll;
};

export type Match = {
  rounds: Array<Round>;
};
