import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import { Roll } from "../types";

import rollAreaMonster from "../assets/RollAreaMonster.svg";
import rollAreaPlayer from "../assets/RollAreaPlayer.svg";

import "./side-element";

@customElement("dd-roll")
export class RollElement extends LitElement {
  @property({ type: Array })
  roll: Roll = [];

  @property({ type: String })
  kind: "monster" | "player" = "player";

  render() {
    return html`
      <img src="${this.kind === "player" ? rollAreaPlayer : rollAreaMonster}" />
      <div class="roll">
        ${when(
          this.roll.length,
          () => html`
            ${map(
              this.roll,
              ([die, side]) =>
                html`<dd-side
                  icon=${side.icon}
                  amount=${side.amount}
                  background=${die.background}
                  color=${die.color}
                ></dd-side>`
            )}
          `
        )}
      </div>
    `;
  }
  static styles = css`
    :host {
      display: block;
      aspect-ratio: 641/76;
      position: relative;
    }
    img {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    .roll {
      box-sizing: border-box;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 1em;
      padding: 0.6em 1.2em;
      font-size: 0.5em;
    }

    dd-side {
      border-radius: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-roll": RollElement;
  }
}
