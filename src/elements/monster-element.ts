import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Die } from "../types";

import "./symbol-element";

@customElement("dd-monster")
export class MonsterElement extends LitElement {
  @property({ type: String })
  name: string = "";

  @property({ type: Number })
  health: number = 0;

  @property({ type: Array })
  deck: Array<Die> = [];

  render() {
    const weaponNames = this.deck
      .map((d) => d.name)
      .filter((n) => n.toLowerCase() != "blank")
      .reduce<Array<string>>(
        (p, c) => (p.includes(c) && p.length !== 0 ? p : [...p, c]),
        []
      );

    return html`
      <h1>${this.name}</h1>
      <h2><dd-symbol name="heart"></dd-symbol> ${this.health}</h2>
      <p>${weaponNames.join(", ")}</p>
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
