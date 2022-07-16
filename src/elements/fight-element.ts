import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GOBLIN, GOBLIN_CLERIC } from "../monsters";
import { PLAYER, START_DECK } from "../player";
import { Creature, Player, Roll, Round } from "../types";
import { evaluateRoll, randomHand, rollHand } from "../helpers";

import "./player-element";
import "./monster-element";
import "./summary-element";

@customElement("dd-fight")
export class FightElement extends LitElement {
  @state()
  rounds: Array<Round> = [];

  @state()
  monster: Creature = { ...GOBLIN_CLERIC };

  @state()
  monsterRoll: Roll = [];

  @state()
  player: Player = { ...PLAYER };

  render() {
    return html`
      <dd-monster
        .name=${this.monster.name}
        .health=${this.monster.health}
        .roll=${this.monsterRoll}
      ></dd-monster>
      <dd-summary .rounds=${this.rounds}></dd-summary>
      <dd-player
        @dd-player-roll=${this.onPlayerRoll}
        .health=${this.player.health}
        .handSize=${this.player.handSize}
        .deck=${this.player.deck}
      ></dd-player>
    `;
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
    "dd-fight": FightElement;
  }
}
