import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { KNIFE_DIE, POTION_DIE, SHIELD_DIE } from "../dice";
import { Die } from "../types";

import "./die-element";

const START_DECK = [
  { ...KNIFE_DIE },
  { ...KNIFE_DIE },
  { ...SHIELD_DIE },
  { ...POTION_DIE },
];

@customElement("dd-player")
export class PlayerElement extends LitElement {
  @property({ type: Number })
  health: number = 20;

  @property({ type: Number })
  handSize: number = 3;

  @property({ type: Array })
  deck: Array<Die> = START_DECK;

  @state()
  hand: Array<Die> = [];

  get displayedDeck() {
    return this.deck.filter((d) => !this.hand.includes(d));
  }

  render() {
    return html`
      <div>
        <h1>${this.health}hp</h1>
        <h1>Your Hand</h1>
        <ul>
          ${map(this.hand, (die) => html`<dd-die .die=${die}></dd-die>`)}
        </ul>
        <h1>Your Deck</h1>
        <ul>
          ${map(
            this.displayedDeck,
            (die) =>
              html`<button @click=${() => this.selectDie(die)}>Select</button
                ><dd-die .die=${die}></dd-die>`
          )}
        </ul>
      </div>
    `;
  }

  selectDie(die: Die) {
    this.hand = [...this.hand, die];
    while (this.hand.length > this.handSize) {
      this.hand = this.hand.slice(1);
    }
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-player": PlayerElement;
  }
}
