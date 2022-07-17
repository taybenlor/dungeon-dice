import { html, css, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { map } from "lit/directives/map.js";
import { BLANK_DIE } from "../dice";
import { Die, Side } from "../types";
import "./side-element";

@customElement("dd-die-display")
export class DieDisplayElement extends LitElement {
  @property({ type: Object })
  die: Die = BLANK_DIE;

  @property({ type: Object })
  side: Side | null = null;

  @state()
  cubeRef: Ref = createRef();

  render() {
    if (this.side) {
      return html` <dd-side
        class="icon alone"
        icon=${this.side!.icon}
        amount=${this.side!.amount}
        background=${this.die.background}
        color=${this.die.color}
      ></dd-side>`;
    } else {
      return html`
        <div class="container">
          <div ${ref(this.cubeRef)} class="cube">
            ${map(
              this.die.sides,
              (side) => html`
                <dd-side
                  class="icon"
                  icon=${side.icon}
                  amount=${side.amount}
                  background=${this.die.background}
                  color=${this.die.color}
                ></dd-side>
              `
            )}
          </div>
        </div>
      `;
    }
  }

  roll() {
    if (!this.cubeRef.value) {
      return;
    }

    const max = 18;
    const min = 10;

    const xRand = (Math.floor(Math.random() * (max - min)) + min) * 90;
    const yRand = (Math.floor(Math.random() * (max - min)) + min) * 90;

    (this.cubeRef.value as HTMLElement).style.transform =
      "translateX(0) rotateX(" +
      xRand +
      "deg) rotateY(" +
      yRand +
      "deg) rotateZ(-30deg)";
  }

  static styles = css`
    dd-side.alone {
      border-radius: 0.25em;
    }

    .container {
      position: relative;

      perspective: 600px;

      width: 3em;
      height: 3em;
    }

    .cube dd-side:nth-child(1) {
      transform: translateZ(1.5em);
    }

    .cube dd-side:nth-child(2) {
      transform: rotateX(90deg) translateZ(1.5em);
    }

    .cube dd-side:nth-child(3) {
      transform: rotateY(90deg) translateZ(1.5em);
    }

    .cube dd-side:nth-child(4) {
      transform: rotateY(-90deg) translateZ(1.5em);
    }

    .cube dd-side:nth-child(5) {
      transform: rotateX(-90deg) translateZ(1.5em);
    }

    .cube dd-side:nth-child(6) {
      transform: rotateX(-180deg) translateZ(1.5em);
    }

    .cube {
      position: absolute;

      transform-style: preserve-3d;
      transition: transform 1s ease-out;

      transform: translateX(0) rotateY(45deg) rotateX(-30deg) rotateZ(-30deg);
    }

    .cube dd-side {
      display: block;
      position: absolute;
      width: 3em;
      height: 3em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-die-display": DieDisplayElement;
  }
}
