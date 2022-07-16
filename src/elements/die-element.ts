import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { BLANK_DIE } from "../dice";
import { Die } from "../types";

/**
 * Die Element
 * Represents any single die that can be rolled
 *
 */
@customElement("dd-die")
export class DieElement extends LitElement {
  @property({ type: Object })
  die: Die = BLANK_DIE;

  render() {
    return html`
      <div>
        <h3>${this.die.name}</h3>
        <ul>
          ${map(
            this.die.sides,
            (side) => html`<li>${side.effect}: ${side.amount}</li>`
          )}
        </ul>
      </div>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-die": DieElement;
  }
}
