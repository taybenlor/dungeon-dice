import { html, css, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { Die } from "../types";
import { DieElement } from "./die-element";

import "./side-element";
import "./die-element";

@customElement("dd-die-information")
export class DieInformationElement extends LitElement {
  @state()
  die: Die | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.style.display = "none";
    window.addEventListener("mousemove", this._onMouseMove);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("mousemove", this._onMouseMove);
  }

  _onMouseMove = (event: MouseEvent) => {
    const path = event.composedPath();
    for (const target of path) {
      if (target instanceof DieElement) {
        if (this.die !== target.die) {
          this.die = target.die;
        }

        this.style.display = "";
        this.style.left = `${event.clientX}px`;
        this.style.bottom = `${window.innerHeight - event.clientY}px`;
        return;
      }
    }

    this.die = null;
    this.style.display = "none";
  };

  render() {
    if (this.die) {
      return html`
        ${map(
          this.die.sides,
          (side) =>
            html`<dd-side
              icon=${side.icon}
              amount=${side.amount}
              background=${this.die!.background}
              color=${this.die!.color}
            ></dd-side>`
        )}
      `;
    } else {
      return html``;
    }
  }

  static styles = css`
    :host {
      position: fixed;
      z-index: 10;
      display: flex;
      flex-wrap: wrap;
      font-size: 0.75em;
      width: calc(12em + 4px);
      gap: 2px;

      background: #e5e5e5;
      border-radius: 8px;
      padding: 1em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-die-information": DieInformationElement;
  }
}
