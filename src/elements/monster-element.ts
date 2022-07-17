import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Roll } from "../types";

import "./symbol-element";

@customElement("dd-monster")
export class MonsterElement extends LitElement {
  @property({ type: String })
  name: string = "";

  @property({ type: Number })
  health: number = 0;

  @property({ type: Array })
  roll: Roll = [];

  render() {
    return html`
      <h1>${this.name}</h1>
      <h2><dd-symbol name="heart"></dd-symbol> ${this.health}</h2>
    `;
  }
  static styles = css`
    :host {
      display: block;
      background: black;
      color: white;
      padding: 1.25em;
    }

    h1 {
      margin: 0;
    }

    h2 {
      margin: 0;
      color: #262b44;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-monster": MonsterElement;
  }
}
