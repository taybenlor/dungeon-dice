import { css, LitElement } from "lit";
import { html, unsafeStatic } from "lit/static-html.js";
import { customElement, property } from "lit/decorators.js";

import DiceSideSVGString from "../assets/DiceSide.svg?raw";
import BlankSVGString from "../assets/Blank.svg?raw";
import DamageSVGString from "../assets/Damage.svg?raw";
import HealSVGString from "../assets/Heal.svg?raw";
import ShieldSVGString from "../assets/Shield.svg?raw";
import BowSVGString from "../assets/Bow.svg?raw";
import FireSVGString from "../assets/Fire.svg?raw";
import MoneySVGString from "../assets/Money.svg?raw";
import SkullSVGString from "../assets/Skull.svg?raw";
import UnhealSVGString from "../assets/Unheal.svg?raw";
import PunchSVGString from "../assets/Punch.svg?raw";
import BiteSVGString from "../assets/Bite.svg?raw";

const IconMap = {
  DiceSide: DiceSideSVGString,
  Blank: BlankSVGString,
  Damage: DamageSVGString,
  Heal: HealSVGString,
  Shield: ShieldSVGString,
  Bow: BowSVGString,
  Fire: FireSVGString,
  Money: MoneySVGString,
  Skull: SkullSVGString,
  Unheal: UnhealSVGString,
  Punch: PunchSVGString,
  Bite: BiteSVGString,
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

  static styles = css`
    svg {
      width: 100%;
      height: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-icon": IconElement;
  }
}
