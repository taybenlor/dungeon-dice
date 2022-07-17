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
      <div class="player">
        <h1>
          ${this.health}hp
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
        </h1>

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
