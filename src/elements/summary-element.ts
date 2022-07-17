import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { evaluateRoll } from "../helpers";
import { when } from "lit/directives/when.js";
import { Round } from "../types";

import infoBoxURL from "../assets/InfoBox.svg";

import "./die-element";

@customElement("dd-summary")
export class SummaryElement extends LitElement {
  @property({ type: Array })
  rounds: Array<Round> = [];

  render() {
    const lastRound = this.rounds[this.rounds.length - 1];
    if (!lastRound) {
      return html``;
    }
    const monsterName = lastRound.monster.name;
    const playerEffects = evaluateRoll(lastRound.playerRoll);
    const monsterEffects = evaluateRoll(lastRound.monsterRoll);

    const effectsList = [];

    if (playerEffects.damage) {
      if (monsterEffects.shield) {
        effectsList.push(
          `Player did ${playerEffects.damage} damage, but ${monsterName} shielded ${monsterEffects.shield}.`
        );
      } else {
        effectsList.push(`Player did ${playerEffects.damage} damage.`);
      }
    }

    if (monsterEffects.backfire) {
      effectsList.push(
        `${monsterName} backfired ${monsterEffects.damage} damage on themselves.`
      );
    }

    if (monsterEffects.damage) {
      if (playerEffects.shield) {
        effectsList.push(
          `${monsterName} did ${monsterEffects.damage} damage, but player shielded ${playerEffects.shield}.`
        );
      } else {
        effectsList.push(`${monsterName} did ${monsterEffects.damage} damage.`);
      }
    }

    if (playerEffects.backfire) {
      effectsList.push(
        `Player backfired ${playerEffects.damage} damage on themselves.`
      );
    }

    if (playerEffects.heal) {
      effectsList.push(`Player healed ${playerEffects.heal} hp.`);
    }

    if (monsterEffects.heal) {
      effectsList.push(`${monsterName} healed ${monsterEffects.heal} hp.`);
    }

    if (playerEffects.money) {
      effectsList.push(`Player looted ${playerEffects.money} coins.`);
    }

    if (monsterEffects.money) {
      effectsList.push(
        `${monsterName} looted ${monsterEffects.money} coins from Player.`
      );
    }

    return effectsList.map((e) => html`<p>${e}</p>`);
  }
  static styles = css`
    :host {
      box-sizing: border-box;
      display: block;
      padding: 0 2em;
      font-size: 12px;

      background: url("${unsafeCSS(infoBoxURL)}");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-summary": SummaryElement;
  }
}
