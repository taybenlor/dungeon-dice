import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { PLAYER, TEST_PLAYER } from "../player";
import { Player, Quest } from "../types";
import { chooseQuests, rateQuest } from "../helpers";

import "./quest-element";

@customElement("dd-game")
export class GameElement extends LitElement {
  @state()
  player: Player = { ...PLAYER };

  @state()
  selectedQuest: Quest | null = null;

  @state()
  questOptions: Array<Quest> = chooseQuests();

  render() {
    if (this.selectedQuest) {
      return html`
        <dd-quest
          .quest=${this.selectedQuest}
          .player=${this.player}
          @dd-player-update=${this.onUpdatePlayer}
          @dd-quest-win=${this.onQuestWin}
        ></dd-quest>
      `;
    } else {
      return html`
        <h1>Pick Quest</h1>
        <div>
          ${map(
            this.questOptions,
            (quest) => html`
              <button @click=${() => (this.selectedQuest = quest)}>
                ${quest.name}, Difficulty ${rateQuest(quest)}
              </button>
            `
          )}
        </div>
      `;
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

  onUpdatePlayer(event: CustomEvent) {
    this.player = {
      ...this.player,
      ...event.detail.player,
    };
  }

  onQuestWin(event: CustomEvent) {
    this.selectedQuest = null;
    this.questOptions = chooseQuests();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-game": GameElement;
  }
}
