import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { BLANK_DIE } from "../dice";
import { Die, Side } from "../types";
import "./side-element";

@customElement("dd-die")
export class DieElement extends LitElement {
  @property({ type: Object })
  die: Die = BLANK_DIE;

  @property({ type: Object })
  side: Side | null = null;

  @property({ type: Boolean })
  selectable: boolean = false;

  render() {
    return html`
      <div
        class=${this.selectable ? "selectable container" : "container"}
        @click=${this.onClick}
      >
        ${when(
          this.side,
          () => html`<dd-side
            class="icon"
            icon=${this.side!.icon}
            amount=${this.side!.amount}
            background=${this.die.background}
            color=${this.die.color}
          ></dd-side>`,
          () => html`<dd-side
            class="icon"
            icon=${this.die.sides[0].icon}
            amount=${1}
            background=${this.die.background}
            color=${this.die.color}
          ></dd-side>`
        )}

        <h3>${this.die.name}</h3>
      </div>
    `;
  }

  static styles = css`
    .container {
      box-sizing: border-box;
      position: relative;
    }

    .container.selectable {
      cursor: pointer;
    }

    h3 {
      margin: 0;
      position: absolute;
      top: 100%;
      width: 100%;
      text-align: center;
      font-size: 0.75em;
    }

    .information {
      display: none;
      flex-wrap: wrap;
      font-size: 0.5em;
      width: calc(12em + 4px);
      gap: 2px;

      position: absolute;
      bottom: 100%;

      background: #e5e5e5;
      border-radius: 8px;
      padding: 1em;
    }

    .container:hover .information,
    .container:focus .information {
      display: flex;
    }

    dd-side {
      border-radius: 4px;
    }
  `;

  onClick() {
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
