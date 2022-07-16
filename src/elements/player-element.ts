import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import { Die, Roll } from "../types";

import "./die-element";

@customElement("dd-player")
export class PlayerElement extends LitElement {
  @property({ type: Number })
  health: number = 20;

  @property({ type: Number })
  handSize: number = 3;

  @property({ type: Array })
  deck: Array<Die> = [];

  @state()
  hand: Array<Die> = [];

  @state()
  currentRoll: Roll | null = null;

  get displayedDeck() {
    return this.deck.filter((d) => !this.hand.includes(d));
  }

  render() {
    return html`
      <div class="player">
        <h1>
          ${this.health}hp
          ${when(
            this.hand.length === this.handSize,
            () => html`<button @click=${this.rollDice}>Roll</button>`
          )}
        </h1>

        ${when(
          this.currentRoll && this.hand.length === 0,
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
          `
        )}
        <div class="hand">
          ${map(
            this.hand,
            (die) =>
              html`<dd-die
                @dd-die-select=${this.unselectDie}
                .die=${die}
              ></dd-die>`
          )}
        </div>
        <div class="deck">
          ${map(
            this.displayedDeck,
            (die) =>
              html`<dd-die
                @dd-die-select=${this.selectDie}
                .die=${die}
              ></dd-die>`
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    .player {
      padding: 1em;
      background: #f0f0f0;
    }

    .deck {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      border-top: 2px solid white;
      padding-top: 1em;
      margin-top: 1em;
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

  rollDice() {
    this.currentRoll = this.hand.map((die) => {
      return [die, die.sides[Math.floor(Math.random() * die.sides.length)]];
    });

    this.dispatchEvent(
      new CustomEvent("dd-player-roll", {
        detail: {
          roll: this.currentRoll,
        },
      })
    );

    this.hand = [];
  }

  selectDie(event: CustomEvent) {
    this.hand = [...this.hand, event.detail.die];
    while (this.hand.length > this.handSize) {
      this.hand = this.hand.slice(1);
    }
  }

  unselectDie(event: CustomEvent) {
    this.hand = this.hand.filter((d) => d != event.detail.die);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-player": PlayerElement;
  }
}
