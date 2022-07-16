import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SEWER } from "../quests";
import { PLAYER } from "../player";
import { Creature, Player, Quest } from "../types";

import "./fight-element";

@customElement("dd-quest")
export class QuestElement extends LitElement {
  @property({ type: Object })
  quest: Quest = SEWER;

  @property({ type: Object })
  player: Player = { ...PLAYER };

  @state()
  remainingEncounters: Array<Creature> = [...SEWER.encounters];

  @state()
  monster: Creature = { ...SEWER.encounters[0] };

  @state()
  screen: "fight" | "shop" | "loot" | "lose" = "fight";

  willUpdate(changedProperties: Record<string, any>) {
    if ("quest" in changedProperties) {
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
      return html` <h1 @click=${() => (this.screen = "fight")}>Shop</h1> `;
    } else if (this.screen === "loot") {
      return html` <h1 @click=${() => (this.screen = "fight")}>Loot</h1> `;
    } else if (this.screen === "lose") {
      return html` <h1>Lose</h1> `;
    } else {
      return html``;
    }
  }
  static styles = css``;

  onFightUpdate(event: CustomEvent) {
    if ("monster" in event.detail) {
      this.monster = event.detail.monster;
    }

    if ("player" in event.detail) {
      this.player = event.detail.player;
    }
  }

  onWin() {
    this.remainingEncounters = this.remainingEncounters.slice(1);

    if (this.remainingEncounters.length) {
      this.monster = { ...this.remainingEncounters[0] };
      this.screen = "shop";
    } else {
      this.screen = "loot";
    }
  }

  onLose() {
    this.screen = "lose";
  }

  onLootFinished() {
    this.dispatchEvent(new CustomEvent("dd-quest-win"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-quest": QuestElement;
  }
}
