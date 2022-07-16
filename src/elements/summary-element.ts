import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { evaluateRoll } from "../helpers";
import { when } from "lit/directives/when.js";
import { Round } from "../types";

import "./die-element";

@customElement("dd-summary")
export class SummaryElement extends LitElement {
  @property({ type: Array })
  rounds: Array<Round> = [];

  render() {
    const lastRound = this.rounds[this.rounds.length - 1];
    const playerEffects = evaluateRoll(lastRound.playerRoll);
    const monsterEffects = evaluateRoll(lastRound.monsterRoll);
    return html`
      <p>
        Player did ${playerEffects.damage} damage to ${lastRound.monster.name}
        ${when(
          playerEffects.heal,
          () => html`, and healed ${playerEffects.heal}`
        )}
        ${when(
          playerEffects.shield,
          () => html`, and shielded ${playerEffects.shield} damage`
        )}
        ${when(
          playerEffects.backfire,
          () => html`, and backfired ${playerEffects.backfire} damage`
        )}
        . ${lastRound.monster.name} did ${monsterEffects.damage} damage to
        Player
        ${when(
          monsterEffects.heal,
          () => html`, and healed ${monsterEffects.heal}`
        )}
        ${when(
          monsterEffects.shield,
          () => html`, and shielded ${monsterEffects.shield} damage`
        )}
        ${when(
          monsterEffects.backfire,
          () => html`, and backfired ${monsterEffects.backfire} damage`
        )}
        .
      </p>
    `;
  }
  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-summary": SummaryElement;
  }
}
