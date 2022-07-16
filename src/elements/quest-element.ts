import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { JUNGLE } from "../quests";
import { PLAYER } from "../player";
import { Creature, Player, Quest, Roll, Round } from "../types";
import { evaluateRoll, randomHand, rollHand } from "../helpers";

import "./fight-element";
import { RAT } from "../monsters";

@customElement("dd-quest")
export class QuestElement extends LitElement {
  @property({ type: Object })
  quest: Quest = JUNGLE;

  @state()
  remainingEncounters: Array<Creature> = [];

  @state()
  currentEncounter: Creature = { ...RAT };

  @state()
  player: Player = { ...PLAYER };

  render() {
    return html``;
  }
  static styles = css``;

  onPlayerRoll(event: CustomEvent) {
    const monsterHand = randomHand(this.monster.deck, this.monster.handSize);
    const monsterRoll = rollHand(monsterHand);
    this.evaluateRound({
      player: { ...this.player },
      monster: { ...this.monster },
      playerRoll: [...event.detail.roll],
      monsterRoll: [...monsterRoll],
    });
    this.monsterRoll = monsterRoll;
  }

  evaluateRound(round: Round) {
    const playerEffects = evaluateRoll(round.playerRoll);
    const monsterEffects = evaluateRoll(round.monsterRoll);

    const playerDamage = Math.max(
      0,
      playerEffects.damage - monsterEffects.shield
    );
    const monsterDamage = Math.max(
      0,
      monsterEffects.damage - playerEffects.shield
    );

    const monster = this.monster;
    monster.health -= playerDamage;
    if (monster.health <= 0) {
      // TODO: Kill monster
    }

    const player = this.player;
    player.health -= monsterDamage;
    if (player.health <= 0) {
      // TODO: Kill player
    }

    monster.health += monsterEffects.heal;
    player.health += playerEffects.heal;

    this.rounds = [...this.rounds, round];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-quest": QuestElement;
  }
}
