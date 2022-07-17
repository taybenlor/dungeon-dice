import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { Die } from "../types";

import "./die-element";

import lightButtonURL from "../assets/LightButton.png";
import chestURL from "../assets/Chest.png";

@customElement("dd-loot")
export class LootElement extends LitElement {
  @property({ type: Array })
  rewards: Array<Die> = [];

  render() {
    return html`
      <h1>
        <span>Loot</span>
        <button class="button" @click=${this.onExit}>Continue</button>
      </h1>
      <div class="container">
        <div class="dice">
          ${map(this.rewards, (die) => html` <dd-die .die=${die}></dd-die> `)}
        </div>
        <img src=${chestURL} width="128" height="128" />
      </div>
    `;
  }
  static styles = css`
    :host {
      box-sizing: border-box;
      padding: 1em;
    }

    h1 {
      color: white;
      margin: 0;
      display: flex;
      justify-content: space-between;

      padding: 0 1em;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 2em;
      gap: 2em;
    }

    .dice {
      padding: 2em 2em 3em;
      display: inline-flex;
      gap: 2em;
      background: #e5e5e5;
      border-radius: 1em;
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
  `;

  onExit() {
    this.dispatchEvent(new CustomEvent("dd-loot-exit"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-loot": LootElement;
  }
}
