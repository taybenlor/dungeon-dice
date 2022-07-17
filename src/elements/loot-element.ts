import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { PLAYER } from "../player";
import { Die, Player } from "../types";

import "./die-element";

@customElement("dd-loot")
export class LootElement extends LitElement {
  @property({ type: Array })
  rewards: Array<Die> = [];

  render() {
    return html`
      <h1>Loot <button @click=${this.onExit}>Continue</button></h1>
      <div class="container">
        ${map(this.rewards, (die) => html` <dd-die .die=${die}></dd-die> `)}
      </div>
    `;
  }
  static styles = css`
    .container {
      display: flex;
      gap: 2em;
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
