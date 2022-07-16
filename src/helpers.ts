import { Die, Effect, Quest, Roll } from "./types";

export function rollHand(hand: Array<Die>): Roll {
  return hand.map((die) => {
    return [die, die.sides[Math.floor(Math.random() * die.sides.length)]];
  });
}

export function randomHand(deck: Array<Die>, handSize: number): Array<Die> {
  const hand: Array<Die> = [];
  while (hand.length < handSize) {
    const deckWithoutHand = deck.filter((d) => !hand.includes(d));
    hand.push(
      deckWithoutHand[Math.floor(Math.random() * deckWithoutHand.length)]
    );
  }
  return hand;
}

export function evaluateRoll(roll: Roll): Record<Effect, number> {
  const results: Record<Effect, number> = {
    damage: 0,
    heal: 0,
    shield: 0,
    blank: 0,
    backfire: 0,
    money: 0,
  };

  for (const [_, side] of roll) {
    const currentAmount = results[side.effect] ?? 0;
    results[side.effect] = currentAmount + side.amount;
  }

  return results;
}

export function rateQuest(quest: Quest): number {
  const totalHp = quest.encounters
    .map((m) => m.health)
    .reduce((p, c) => p + c, 0);

  const totalDmg = quest.encounters
    .flatMap((m) => m.deck.flatMap((d) => expectedDamage(d)))
    .reduce((p, c) => p + c, 0);

  return Math.floor((totalHp + totalDmg) / 10);
}

export function expectedDamage(die: Die) {
  return die.sides
    .map((s) => (s.effect === "damage" ? s.amount / 6 : 0))
    .reduce((p, c) => p + c, 0);
}
