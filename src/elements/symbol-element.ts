import { css, LitElement } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { customElement, property } from "lit/decorators.js";

import HeartSVG from "../assets/symbols/heart.svg?raw";

const IconMap = {
  heart: HeartSVG,
};

export type IconName = keyof typeof IconMap;

@customElement("dd-symbol")
export class SymbolElement extends LitElement {
  @property({ type: String })
  name: IconName = "heart";

  render() {
    const svg = unsafeStatic(IconMap[this.name]);
    return html`${svg}`;
  }

  static styles = css`
    :host {
      position: relative;
      display: inline-block;
      vertical-align: bottom;
      width: 1em;
      height: 1em;
    }

    svg {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-symbol": SymbolElement;
  }
}
