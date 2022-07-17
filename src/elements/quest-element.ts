import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SEWER } from "../quests";
import { PLAYER } from "../player";
import { Monster, Player, Quest } from "../types";

import "./fight-element";
import "./shop-element";
import "./loot-element";

@customElement("dd-quest")
export class QuestElement extends LitElement {
  @property({ type: Object })
  quest: Quest = SEWER;

  @property({ type: Object })
  player: Player = { ...PLAYER };

  @state()
  remainingEncounters: Array<Monster> = [...SEWER.encounters];

  @state()
  monster: Monster = { ...SEWER.encounters[0] };

  @state()
  screen: "fight" | "shop" | "loot" | "lose" = "shop";

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has("quest")) {
      this.remainingEncounters = [...this.quest.encounters];
      if (this.remainingEncounters.length) {
        this.monster = { ...this.remainingEncounters[0] };
      }
      this.screen = "fight";
    }
  }

  render() {
    if (this.screen === "fight") {
      return html`
        <dd-fight
          @dd-fight-update=${this.onFightUpdate}
          @dd-fight-win=${this.onWin}
          @dd-fight-lose=${this.onLose}
          .monster=${this.monster}
          .player=${this.player}
        ></dd-fight>
      `;
    } else if (this.screen === "shop") {
      return html`
        <dd-shop
          @dd-shop-exit=${this.onShopExit}
          @dd-shop-buy=${this.onShopBuy}
          .player=${this.player}
        ></dd-shop>
      `;
    } else if (this.screen === "loot") {
      return html`<dd-loot
        @dd-loot-exit=${this.onLootExit}
        .rewards=${this.quest.loot}
      ></dd-loot>`;
    } else if (this.screen === "lose") {
      return html`
        <h1>You Died</h1>
        <button @click=${this.onTryAgain}>Try Again?</button>
      `;
    } else {
      return html``;
    }
  }
  static styles = css`
    .deck {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      border-top: 2px solid white;
      padding-top: 1em;
      margin-top: 1em;
    }
  `;

  onFightUpdate(event: CustomEvent) {
    if ("monster" in event.detail) {
      this.monster = event.detail.monster;
    }

    if ("player" in event.detail) {
      this.dispatchEvent(
        new CustomEvent("dd-player-update", {
          detail: {
            player: event.detail.player,
          },
        })
      );
    }
  }

  onWin() {
    this.remainingEncounters = this.remainingEncounters.slice(1);

    if (this.remainingEncounters.length) {
      this.monster = { ...this.remainingEncounters[0] };
      this.screen = "shop";
      this.dispatchEvent(
        new CustomEvent("dd-player-update", {
          detail: {
            player: {
              money: this.player.money + this.monster.reward,
            },
          },
        })
      );
    } else {
      this.screen = "loot";
    }
  }

  onLose() {
    this.screen = "lose";
  }

  onLootExit() {
    this.dispatchEvent(
      new CustomEvent("dd-player-update", {
        detail: {
          player: {
            deck: [...this.player.deck, ...this.quest.loot],
          },
        },
      })
    );
    this.dispatchEvent(new CustomEvent("dd-quest-win"));
  }

  onShopBuy(event: CustomEvent) {
    const cost = event.detail.cost;
    const money = this.player.money - cost;
    if (money < 0) {
      return;
    }

    const player = { ...this.player };
    const effect = event.detail.effect;
    if (effect === "die") {
      player.deck.push(event.detail.die);
    } else if (effect === "health") {
      player.health += event.detail.amount;
    } else if (effect === "hand") {
      player.handSize += event.detail.amount;
    } else if (effect === "roll") {
      player.rolls += event.detail.amount;
    }

    this.dispatchEvent(
      new CustomEvent("dd-player-update", {
        detail: {
          player: {
            ...player,
            money,
          },
        },
      })
    );
  }

  onShopExit() {
    this.screen = "fight";
  }

  onTryAgain() {
    window.location.reload();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-quest": QuestElement;
  }
}
