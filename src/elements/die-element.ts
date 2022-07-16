import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { BLANK_DIE } from "../dice";
import { Die } from "../types";
import "./side-element";

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
      <h3>
        ${this.die.name}
        <button @click=${this.select}>Select</button>
      </h3>
      <div class="die-container">
        ${map(
          this.die.sides,
          (side) =>
            html`<dd-side
              icon=${side.icon}
              amount=${side.amount}
              background=${this.die.background}
              color=${this.die.color}
            ></dd-side>`
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      border: 2px solid gray;
      padding: 1em;
    }

    h3 {
      margin: 0;
    }

    .die-container {
      display: flex;
      flex-wrap: wrap;
      font-size: 0.75em;
      width: calc(12em + 4px);
      gap: 2px;
    }
  `;

  select() {
    this.dispatchEvent(
      new CustomEvent("dd-die-select", {
        detail: {
          die: this.die,
        },
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-die": DieElement;
  }
}
