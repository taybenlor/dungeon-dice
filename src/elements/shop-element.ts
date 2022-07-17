import { html, css, LitElement } from "lit";
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
      <h1><button @click=${this.onExit}>Continue</button></h1>
      <div class="container">
        <div class="player">
          <h1>
            Player: ${this.player.health}hp, $${this.player.money},
            ${this.player.handSize} hands
          </h1>
          <div class="deck">
            ${map(
              this.player.deck,
              (die) => html`<dd-die .die=${die}></dd-die>`
            )}
          </div>
        </div>
        <div class="shop">
          <h1>Shop</h1>
          <h2>Level Up</h2>
          <button @click=${this.onHealth}>$2 +1 Health</button>
          <button @click=${this.onRoll}>$6 +1 Roll</button>
          <button @click=${this.onHand}>$10 +1 Hand</button>

          <h2>Weapons</h2>
          <div class="category">
            ${map(
              WEAPON_DICE,
              (die) =>
                html`
                  <div class="item">
                    <h3>$${die.cost}</h3>
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
                    <h3>$${die.cost}</h3>
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
                    <h3>$${die.cost}</h3>
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
                    <h3>$${die.cost}</h3>
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
      </div>
    `;
  }
  static styles = css`
    .container {
      display: flex;
      flex-direction: columns;
    }

    .shop {
      flex-grow: 2;
    }

    .player {
      width: 40%;
      margin-right: 4em;
    }

    .category {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      border: 2px solid white;
      padding-top: 1em;
      margin-top: 1em;
    }

    .deck {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      border-top: 2px solid white;
      padding-top: 1em;
      margin-top: 1em;
    }

    .item {
      display: flex;
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
