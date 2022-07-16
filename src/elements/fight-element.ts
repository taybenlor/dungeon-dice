import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SNAKE } from "../monsters";
import { PLAYER } from "../player";
import { Creature, Player, Roll, Round } from "../types";
import { evaluateRoll, randomHand, rollHand } from "../helpers";

import "./player-element";
import "./monster-element";
import "./summary-element";

@customElement("dd-fight")
export class FightElement extends LitElement {
  @property({ type: Object })
  player: Player = { ...PLAYER };

  @property({ type: Object })
  monster: Creature = { ...SNAKE };

  @state()
  rounds: Array<Round> = [];

  @state()
  monsterRoll: Roll = [];

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

    const monster = { ...this.monster };
    const player = { ...this.player };

    monster.health -= playerDamage;
    monster.health -= monsterEffects.backfire;
    if (monster.health <= 0) {
      monster.health = 0;
      player.health -= playerEffects.backfire;
      player.health += playerEffects.heal;

      this.dispatchEvent(
        new CustomEvent("dd-fight-update", {
          detail: {
            monster,
            player,
          },
        })
      );
      this.dispatchEvent(new CustomEvent("dd-fight-win"));
      return;
    }

    player.health -= monsterDamage;
    player.health -= playerEffects.backfire;
    if (player.health <= 0) {
      player.health = 0;

      this.dispatchEvent(
        new CustomEvent("dd-fight-update", {
          detail: {
            monster,
            player,
          },
        })
      );
      this.dispatchEvent(new CustomEvent("dd-fight-lose"));
      return;
    }

    monster.health += monsterEffects.heal;
    player.health += playerEffects.heal;

    this.dispatchEvent(
      new CustomEvent("dd-fight-update", {
        detail: {
          monster,
          player,
        },
      })
    );

    this.rounds = [...this.rounds, round];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-fight": FightElement;
  }
}
