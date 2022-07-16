import { Die, Effect, Roll } from "./types";

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
  };

  for (const [_, side] of roll) {
    const currentAmount = results[side.effect] ?? 0;
    results[side.effect] = currentAmount + side.amount;
  }

  return results;
}
