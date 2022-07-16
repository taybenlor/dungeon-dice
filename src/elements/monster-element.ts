import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { when } from "lit/directives/when.js";
import { Roll } from "../types";

import "./die-element";

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
      ${when(
        this.health > 0,
        () => html` <h1>${this.name} ${this.health}hp</h1> `,
        () => html` <h1>${this.name} (Dead)</h1> `
      )}
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
      background: black;
      color: white;
      padding: 1em;
    }

    .roll {
      display: flex;
      gap: 1em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-monster": MonsterElement;
  }
}
