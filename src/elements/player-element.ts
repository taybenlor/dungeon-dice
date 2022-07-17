import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import { rollHand } from "../helpers";
import { Die, Roll } from "../types";

import handSlotURL from "../assets/HandSlot.svg";
import lightButtonURL from "../assets/LightButton.png";

import "./die-element";
import { CLICK_SOUNDS, playRandomSound } from "../sound";

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

  @property({ type: Boolean })
  disabled: boolean = false;

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
    const emptyHand = new Array<undefined>(this.handSize - this.hand.length);
    return html`
      <div class="row">
        <div class="controls">
          ${when(
            this.hand.length === this.handSize && this.rollsUsed === 0,
            () =>
              html`
                <button class="roll-button" @click=${this.onRollDice}>
                  <dd-symbol name="roll"></dd-symbol> Roll
                </button>
              `
          )}
          ${when(
            this.hand.length === this.handSize && this.rollsUsed === this.rolls,
            () =>
              html`
                <button class="roll-button" @click=${this.onAttack}>
                  Attack
                </button>
              `
          )}
          ${when(
            this.hand.length === this.handSize &&
              this.rollsUsed > 0 &&
              this.rollsUsed < this.rolls,
            () => html`
              <button class="roll-button" @click=${this.onAttack}>
                Attack
              </button>
              <button class="roll-button" @click=${this.onRollDice}>
                <dd-symbol name="roll"></dd-symbol> (${this.rolls -
                this.rollsUsed}
                left)
              </button>
            `
          )}
        </div>
        ${when(
          this.currentRoll,
          () => html`
            <div class="hand">
              ${map(
                this.currentRoll!,
                ([die, side]) =>
                  html`
                    <div class="slot">
                      <img src=${handSlotURL} />
                      <dd-die
                        @dd-die-select=${this.onToggleLockDie}
                        .die=${die}
                        .side=${side}
                        .selectable=${true}
                      ></dd-die>
                    </div>
                  `
              )}
            </div>
          `,
          () => html`
            <div class="hand">
              ${map(
                this.hand,
                (die) =>
                  html`
                    <div class="slot">
                      <img src=${handSlotURL} />
                      <dd-die
                        @dd-die-select=${this.onUnselectDie}
                        .die=${die}
                        .selectable=${true}
                      ></dd-die>
                    </div>
                  `
              )}
              ${map(
                emptyHand,
                () => html`
                  <div class="slot">
                    <img src=${handSlotURL} />
                  </div>
                `
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
                .selectable=${!this.disabled}
              ></dd-die>`
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      background: #e0a875;
      padding-top: 2em;
    }

    img {
      image-rendering: pixelated;
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
      padding-bottom: 2em;
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
      box-sizing: border-box;
      flex-shrink: 0;
      width: calc(min(100vh, 100vw) * (2 / 7) + 3em);

      display: flex;
      flex-direction: column;
      gap: 0.4em;
      justify-content: center;
      align-items: center;
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
      gap: 2em;
      padding: 2em;
      margin: 1em;
      border-radius: 1em;
    }

    .deck dd-die {
      position: relative;
      top: 1.5em;
    }

    .hand {
      display: flex;
      gap: 1em;
      font-size: 0.6em;
    }

    .slot {
      position: relative;
      width: 70px;
      height: 70px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .slot img {
      position: absolute;
      top: 0px;
      left: 0px;
    }

    .roll-button {
      background: url("${unsafeCSS(lightButtonURL)}");
      background-size: contain;
      height: 2.4em;
      aspect-ratio: 190 / 49;
      border: none;
      cursor: pointer;
      font-family: "Kenney Square", sans-serif;
      color: #272b42;
      padding-bottom: 4px;
    }
  `;

  onRollDice() {
    if (this.disabled) {
      return;
    }

    if (this.rollsUsed === this.rolls) {
      return;
    }

    playRandomSound(CLICK_SOUNDS);

    this.disabled = true;

    this.currentRoll = null;

    setTimeout(() => {
      const dice = this.shadowRoot?.querySelectorAll(".hand dd-die") ?? [];
      for (const die of dice) {
        die.shadowRoot?.querySelector("dd-die-display")?.roll();
      }
    }, 0);

    setTimeout(() => {
      this.disabled = false;
      this.rollsUsed += 1;
      this.currentRoll = rollHand(this.hand);
    }, 800);
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

    playRandomSound(CLICK_SOUNDS);
  }

  onSelectDie(event: CustomEvent) {
    if (this.disabled || this.currentRoll) {
      return;
    }

    this.hand = [...this.hand, event.detail.die];
    while (this.hand.length > this.handSize) {
      this.hand = this.hand.slice(1);
    }

    playRandomSound(CLICK_SOUNDS);
  }

  onToggleLockDie() {
    playRandomSound(CLICK_SOUNDS);
  }

  onUnselectDie(event: CustomEvent) {
    this.hand = this.hand.filter((d) => d != event.detail.die);

    playRandomSound(CLICK_SOUNDS);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-player": PlayerElement;
  }
}
