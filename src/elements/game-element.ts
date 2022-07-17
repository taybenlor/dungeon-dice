import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

import { PLAYER, TEST_PLAYER } from "../player";
import { Player, Quest } from "../types";
import { chooseQuests, rateQuest } from "../helpers";

import questBackgroundURL from "../assets/QuestBackground.png";
import lightButtonURL from "../assets/LightButton.png";

import "./quest-element";
import "./die-information-element";

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
        <dd-die-information></dd-die-information>
        <dd-quest
          .quest=${this.selectedQuest}
          .player=${this.player}
          @dd-player-update=${this.onUpdatePlayer}
          @dd-quest-win=${this.onQuestWin}
        ></dd-quest>
      `;
    } else {
      return html`
        <div class="picker">
          <img src="${questBackgroundURL}" />

          <h1>Die Dungeon, Die</h1>

          <div class="buttons">
            ${map(
              this.questOptions,
              (quest) => html`
                <div class="button-container">
                  <p class="difficulty">Difficulty: ${rateQuest(quest)}</p>
                  <button
                    class="quest-button"
                    @click=${() => (this.selectedQuest = quest)}
                  >
                    ${quest.name}
                  </button>
                </div>
              `
            )}
          </div>
        </div>
      `;
    }
  }
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }

    .picker img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    h1 {
      position: absolute;
      top: 5%;
      width: 100%;
      text-align: center;
      color: white;
    }

    .buttons {
      position: absolute;
      top: 17%;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      gap: 1em;
    }

    .button-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .difficulty {
      display: inline-block;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 100px;
      padding: 0.5em 1em;
      color: white;
      font-size: calc(min(100vw, 100vh) * 0.015);
    }

    .quest-button {
      background: url("${unsafeCSS(lightButtonURL)}");
      background-size: contain;
      width: calc(min(100vw, 100vh) * 0.25);
      font-size: calc(min(100vw, 100vh) * 0.02);
      aspect-ratio: 190 / 49;
      border: none;
      cursor: pointer;
      font-family: "Kenney Square", sans-serif;
      color: #272b42;
      padding-bottom: 4px;
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
