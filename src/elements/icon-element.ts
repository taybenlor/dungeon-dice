import { css, LitElement } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { customElement, property } from "lit/decorators.js";

import DiceSideSVGString from "../assets/DiceSide.svg?raw";
import BlankSVGString from "../assets/Blank.svg?raw";
import DamageSVGString from "../assets/Damage.svg?raw";
import HealSVGString from "../assets/Heal.svg?raw";
import ShieldSVGString from "../assets/Shield.svg?raw";

const IconMap = {
  DiceSide: DiceSideSVGString,
  Blank: BlankSVGString,
  Damage: DamageSVGString,
  Heal: HealSVGString,
  Shield: ShieldSVGString,
};

export type IconName = keyof typeof IconMap;

@customElement("dd-icon")
export class IconElement extends LitElement {
  @property({ type: String })
  name: IconName = "DiceSide";

  render() {
    const svg = unsafeStatic(IconMap[this.name]);
    return html`${svg}`;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-icon": IconElement;
  }
}
