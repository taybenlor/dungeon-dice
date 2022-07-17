import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import {
  ARMOR_DIE,
  AXE_DIE,
  BOW_DIE,
  CHEAP_POTION_DIE,
  DEATHRAY_DIE,
  FIREBALL_DIE,
  HELMET_DIE,
  KNIFE_DIE,
  LARGE_POTION_DIE,
  LOOT_DIE,
  POTION_DIE,
  SHIELD_DIE,
  SWORD_DIE,
} from "../dice";
import { PLAYER } from "../player";
import { Die, Player } from "../types";

import "./die-element";

import lightButtonURL from "../assets/LightButton.png";
import darkButtonURL from "../assets/DarkButton.png";

const WEAPON_DICE = [KNIFE_DIE, SWORD_DIE, AXE_DIE, BOW_DIE];
const ARMOR_DICE = [ARMOR_DIE, HELMET_DIE, SHIELD_DIE];
const HEALING_DICE = [POTION_DIE, LARGE_POTION_DIE, CHEAP_POTION_DIE];
const SPELL_DICE = [FIREBALL_DIE, DEATHRAY_DIE, LOOT_DIE];

@customElement("dd-shop")
export class ShopElement extends LitElement {
  @property({ type: Object })
  player: Player = { ...PLAYER };

  render() {
    return html`
      <h1>
        Shop <button class="button" @click=${this.onExit}>Continue</button>
      </h1>
      <div class="container">
        <div class="shop">
          <h2>Level Up</h2>
          <div class="category">
            <button class="button level" @click=${this.onHealth}>
              <span class="cost"> <dd-symbol name="money"></dd-symbol> 2 </span>
              <span class="effect">
                +<dd-symbol name="heart"></dd-symbol>
              </span>
            </button>
            <button class="button level" @click=${this.onRoll}>
              <span class="cost"> <dd-symbol name="money"></dd-symbol> 6 </span>
              <span class="effect"> +<dd-symbol name="roll"></dd-symbol> </span>
            </button>
            <button class="button level" @click=${this.onHand}>
              <span class="cost">
                <dd-symbol name="money"></dd-symbol> 10
              </span>
              <span class="effect"> +<dd-symbol name="hand"></dd-symbol> </span>
            </button>
          </div>

          <h2>Weapons</h2>
          <div class="category">
            ${map(
              WEAPON_DICE,
              (die) =>
                html`
                  <div class="item">
                    <h3><dd-symbol name="money"></dd-symbol> ${die.cost}</h3>
                    <dd-die
                      @dd-die-select=${this.onSelectDie}
                      .die=${die}
                      .selectable=${true}
                    ></dd-die>
                  </div>
                `
            )}
          </div>
          <h2>Armor</h2>
          <div class="category">
            ${map(
              ARMOR_DICE,
              (die) =>
                html`
                  <div class="item">
                    <h3><dd-symbol name="money"></dd-symbol> ${die.cost}</h3>
                    <dd-die
                      @dd-die-select=${this.onSelectDie}
                      .die=${die}
                      .selectable=${true}
                    ></dd-die>
                  </div>
                `
            )}
          </div>
          <h2>Healing</h2>
          <div class="category">
            ${map(
              HEALING_DICE,
              (die) =>
                html`
                  <div class="item">
                    <h3><dd-symbol name="money"></dd-symbol> ${die.cost}</h3>
                    <dd-die
                      @dd-die-select=${this.onSelectDie}
                      .die=${die}
                      .selectable=${true}
                    ></dd-die>
                  </div>
                `
            )}
          </div>
          <h2>Spells</h2>
          <div class="category">
            ${map(
              SPELL_DICE,
              (die) =>
                html`
                  <div class="item">
                    <h3><dd-symbol name="money"></dd-symbol> ${die.cost}</h3>
                    <dd-die
                      @dd-die-select=${this.onSelectDie}
                      .die=${die}
                      .selectable=${true}
                    ></dd-die>
                  </div>
                `
            )}
          </div>
        </div>
        <dd-player
          .disabled=${true}
          .health=${this.player.health}
          .handSize=${this.player.handSize}
          .deck=${this.player.deck}
          .rolls=${this.player.rolls}
          .money=${this.player.money}
        ></dd-player>
      </div>
    `;
  }
  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
    }

    h1,
    h2,
    h3 {
      margin: 0;
    }

    h1 {
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5em;
      flex-shrink: 0;
    }

    h2 {
      box-sizing: border-box;
      padding: 1em 0 0 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .player {
      flex-shrink: 0;
    }

    .category {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      padding: 1em 0 2em 0;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
    }

    .shop {
      overflow: scroll;
      background: #e5e5e5;
      flex-grow: 1;
      flex-basis: 0;
      padding: 0em 1em 2em;
    }

    .button {
      background: url("${unsafeCSS(lightButtonURL)}");
      background-size: contain;
      height: 3em;
      aspect-ratio: 190 / 49;
      border: none;
      cursor: pointer;
      font-family: "Kenney Square", sans-serif;
      color: #272b42;
      padding-bottom: 4px;
    }

    .button.level {
      height: 2em;
      display: flex;
      align-items: stretch;
      background-image: url("${unsafeCSS(darkButtonURL)}");
    }
    .button.level span {
      flex-grow: 1;
    }
    .button.level span:first-child {
      border-right: 1px solid #727685;
    }
  `;

  onExit() {
    this.dispatchEvent(new CustomEvent("dd-shop-exit"));
  }

  onHand() {
    this.dispatchEvent(
      new CustomEvent("dd-shop-buy", {
        detail: {
          cost: 10,
          effect: "hand",
          amount: 1,
        },
      })
    );
  }

  onHealth() {
    this.dispatchEvent(
      new CustomEvent("dd-shop-buy", {
        detail: {
          cost: 2,
          effect: "health",
          amount: 1,
        },
      })
    );
  }

  onRoll() {
    this.dispatchEvent(
      new CustomEvent("dd-shop-buy", {
        detail: {
          cost: 6,
          effect: "roll",
          amount: 1,
        },
      })
    );
  }

  onSelectDie(event: CustomEvent) {
    const die = event.detail.die as Die;
    this.dispatchEvent(
      new CustomEvent("dd-shop-buy", {
        detail: {
          cost: die.cost,
          effect: "die",
          die: die,
        },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-shop": ShopElement;
  }
}
