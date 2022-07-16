import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { IconName } from "./icon-element";
import "./icon-element";

@customElement("dd-side")
export class SideElement extends LitElement {
  @property({ type: String })
  icon: IconName = "Blank";

  @property({ type: Number })
  amount: number = 0;

  @property({ type: String })
  background: string = "";

  @property({ type: String })
  color: string = "";

  render() {
    return html`
      <style>
        :host {
          background: ${this.background};
          color: ${this.color};
        }
      </style>
      <dd-icon name=${this.icon}></dd-icon>
      ${when(
        this.amount > 1,
        () => html`<span class="amount">${this.amount}</span>`
      )}
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 4em;
      height: 4em;
      position: relative;
    }

    dd-icon {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    .amount {
      position: absolute;
      bottom: 0.5em;
      right: 0.5em;
      font-weight: bold;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-side": SideElement;
  }
}
