import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";

import { PLAYER } from "../player";
import { Player, Quest } from "../types";
import { chooseQuests, rateQuest } from "../helpers";

import questBackgroundURL from "../assets/QuestBackground.png";
import lightButtonURL from "../assets/LightButton.png";

import "./quest-element";
import "./die-information-element";
import { CLICK_SOUNDS, OPEN_SOUNDS, playRandomSound } from "../sound";

@customElement("dd-game")
export class GameElement extends LitElement {
  @state()
  player: Player = { ...PLAYER };

  @state()
  selectedQuest: Quest | null = null;

  @state()
  questOptions: Array<Quest> = chooseQuests();

  @state()
  firstTime: boolean = true;

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
        ${when(
          this.firstTime,
          () => html`
            <div class="overlay">
              <h1>Die Dungeon, Die</h1>
              <button
                class="quest-button"
                @click=${() => {
                  this.firstTime = false;
                  playRandomSound(CLICK_SOUNDS);
                }}
              >
                Play
              </button>
            </div>
          `,
          () => html`
            <audio
              src="./gmtk2022-menu.mp3"
              .volume=${0.5}
              autoplay
              loop
            ></audio>
          `
        )}

        <div class="picker">
          <img src="${questBackgroundURL}" />

          <h1>Die Dungeon, Die</h1>

          <div class="buttons">
            ${map(
              this.firstTime ? [] : this.questOptions,
              (quest) => html`
                <div class="button-container">
                  <p class="difficulty">Difficulty: ${rateQuest(quest)}</p>
                  <button
                    class="quest-button"
                    @click=${() => {
                      this.selectedQuest = quest;
                      playRandomSound(CLICK_SOUNDS);
                      playRandomSound(OPEN_SOUNDS);
                    }}
                  >
                    ${quest.name}
                  </button>
                </div>
              `
            )}
          </div>

          <h2>by Ben Taylor (@taybenlor)</h2>
        </div>
      `;
    }
  }
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
    }

    .overlay {
      background: rgba(0, 0, 0, 0.5);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2em;

      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
    }

    img {
      image-rendering: pixelated;
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
      text-shadow: 0.1em 0.1em 0px rgba(0, 0, 0, 0.25);
    }

    h2 {
      position: absolute;
      bottom: 5%;
      right: 5%;
      text-align: right;
      color: white;
      font-size: 1em;
      text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.25);
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

  onQuestWin() {
    this.selectedQuest = null;
    this.questOptions = chooseQuests();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-game": GameElement;
  }
}
