import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import { rollHand } from "../helpers";
import { Die, Roll } from "../types";

import "./die-element";

@customElement("dd-player")
export class PlayerElement extends LitElement {
  @property({ type: Number })
  health: number = 10;

  @property({ type: Number })
  handSize: number = 2;

  @property({ type: Number })
  rolls: number = 1;

  @property({ type: Number })
  money: number = 0;

  @property({ type: Array })
  deck: Array<Die> = [];

  @state()
  hand: Array<Die> = [];

  @state()
  currentRoll: Roll | null = null;

  @state()
  rollsUsed: number = 0;

  get displayedDeck() {
    return this.deck.filter((d) => !this.hand.includes(d));
  }

  render() {
    return html`
      <div class="row">
        <div class="controls">
          ${when(
            this.hand.length === this.handSize && this.rollsUsed === 0,
            () => html` <button @click=${this.onRollDice}>Roll</button> `
          )}
          ${when(
            this.hand.length === this.handSize && this.rollsUsed === this.rolls,
            () => html` <button @click=${this.onAttack}>Attack</button> `
          )}
          ${when(
            this.hand.length === this.handSize &&
              this.rollsUsed > 0 &&
              this.rollsUsed < this.rolls,
            () => html`
              <button @click=${this.onAttack}>Attack</button>
              <button @click=${this.onRollDice}>
                Re-roll (${this.rolls - this.rollsUsed})
              </button>
            `
          )}
        </div>
        ${when(
          this.currentRoll,
          () => html`
            <div class="roll">
              ${map(
                this.currentRoll!,
                ([die, side]) =>
                  html`<dd-side
                    icon=${side.icon}
                    amount=${side.amount}
                    background=${die.background}
                    color=${die.color}
                  ></dd-side>`
              )}
            </div>
          `,
          () => html`
            <div class="hand">
              ${map(
                this.hand,
                (die) =>
                  html`<dd-die
                    @dd-die-select=${this.onUnselectDie}
                    .die=${die}
                    .selectable=${true}
                  ></dd-die>`
              )}
            </div>
          `
        )}
      </div>
      <div class="row">
        <div class="player">
          <ul>
            <li><dd-symbol name="heart"></dd-symbol> ${this.health}</li>
            <li><dd-symbol name="money"></dd-symbol> ${this.money}</li>
            <li><dd-symbol name="roll"></dd-symbol> ${this.rolls}</li>
            <li><dd-symbol name="hand"></dd-symbol> ${this.handSize}</li>
          </ul>
          <h1>You</h1>
        </div>
        <div class="deck">
          ${map(
            this.displayedDeck,
            (die) =>
              html`<dd-die
                @dd-die-select=${this.onSelectDie}
                .die=${die}
                .selectable=${true}
              ></dd-die>`
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      background: #e0a875;
    }

    .player {
      box-sizing: border-box;
      flex-shrink: 0;
      width: calc(min(100vh, 100vw) * (2 / 7));
      background: #ece3ce;
      border-radius: 1em;
      margin: 1em;
      padding: 1em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .player ul {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      gap: 1em;
      padding: 0;
      margin: 0;
    }

    .player li {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .player h1 {
      text-align: center;
      margin: 0;
      padding: 0;
    }

    .controls {
      width: calc(min(100vh, 100vw) * (1 / 7));
    }

    .row {
      display: flex;
    }

    .deck {
      flex-grow: 1;
      box-sizing: border-box;
      display: flex;
      overflow: scroll;
      background: rgba(0, 0, 0, 0.2);
      gap: 1em;
      padding: 1em;
      margin: 1em;
      border-radius: 1em;
    }

    .hand {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
    }

    .roll {
      display: flex;
      gap: 1em;
    }
  `;

  onRollDice() {
    if (this.rollsUsed === this.rolls) {
      return;
    }

    this.rollsUsed += 1;

    this.currentRoll = rollHand(this.hand);
  }

  onAttack() {
    this.rollsUsed = 0;

    this.dispatchEvent(
      new CustomEvent("dd-player-roll", {
        detail: {
          roll: this.currentRoll,
        },
      })
    );

    this.currentRoll = null;
    this.hand = [];
  }

  onSelectDie(event: CustomEvent) {
    this.hand = [...this.hand, event.detail.die];
    while (this.hand.length > this.handSize) {
      this.hand = this.hand.slice(1);
    }
  }

  onUnselectDie(event: CustomEvent) {
    this.hand = this.hand.filter((d) => d != event.detail.die);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-player": PlayerElement;
  }
}
