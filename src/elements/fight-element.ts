import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import { MONSTER_PICS, SNAKE } from "../monsters";
import { PLAYER } from "../player";
import { Creature, Monster, Player, Roll, Round } from "../types";
import { evaluateRoll, randomHand, rollHand } from "../helpers";

import pictureFrameURL from "../assets/PictureFrame.png";
import monsterInfoURL from "../assets/MonsterInfo.png";
import lightButtonURL from "../assets/LightButton.png";

import "./player-element";
import "./monster-element";
import "./summary-element";
import "./roll-element";
import {
  CLOSE_SOUNDS,
  GLITCH_SOUNDS,
  playRandomSound,
  playSound,
  POWER_UP_SOUNDS,
} from "../sound";

@customElement("dd-fight")
export class FightElement extends LitElement {
  @property({ type: Object })
  player: Player = { ...PLAYER };

  @property({ type: Object })
  monster: Monster = { ...SNAKE };

  @state()
  rounds: Array<Round> = [];

  @state()
  monsterRoll: Roll = [];

  @state()
  playerRoll: Roll = [];

  @state()
  state: "fighting" | "lose" | "win" = "fighting";

  render() {
    return html`
      <audio src="./gmtk2022-fight.mp3" .volume=${0.5} autoplay loop></audio>
      <div class="row">
        <dd-monster
          .name=${this.monster.name}
          .health=${this.monster.health}
          .deck=${this.monster.deck}
        ></dd-monster>
        <dd-summary .rounds=${this.rounds}></dd-summary>
        <div class="picture">
          <img class="frame" src=${pictureFrameURL} />
          <img class="monster" src=${MONSTER_PICS[this.monster.name]} />
        </div>
      </div>

      <div class="roll-area">
        <div class="row">
          <dd-roll kind="monster" .roll=${this.monsterRoll}></dd-roll>
        </div>
        <div class="row">
          <dd-roll kind="player" .roll=${this.playerRoll}></dd-roll>
        </div>
      </div>

      ${when(
        this.state === "win",
        () => html` <div class="win-area">
          <h2>You slayed the ${this.monster.name}.</h2>
          <h2>
            Reward <dd-symbol name="money"></dd-symbol> ${this.monster.reward}
          </h2>
          <button class="button" @click=${this.onAckWin}>Continue</button>
        </div>`
      )}
      ${when(
        this.state === "lose",
        () => html` <div class="lose-area">
          <h2>The ${this.monster.name} defeated you.</h2>
          <button class="button" @click=${this.onAckLose}>Continue</button>
        </div>`
      )}

      <dd-player
        @dd-player-roll=${this.onPlayerRoll}
        .health=${this.player.health}
        .handSize=${this.player.handSize}
        .deck=${this.player.deck}
        .rolls=${this.player.rolls}
        .money=${this.player.money}
        .disabled=${this.state !== "fighting"}
      ></dd-player>
    `;
  }
  static styles = css`
    :host {
      height: 100%;
    }

    img {
      image-rendering: pixelated;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }

    dd-player {
      display: block;
      width: 100%;
      height: calc(min(100vh, 100vw) * (3 / 7));
      overflow: scroll;
    }

    .roll-area {
      background: #6e3e38;
      height: calc(min(100vh, 100vw) * (2 / 7));

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
    }

    .lose-area,
    .win-area {
      background: rgba(0, 0, 0, 0.5);

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2em;

      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 11;
    }

    .lose-area h2,
    .win-area h2 {
      color: white;
      text-align: center;
    }

    dd-roll {
      height: calc(min(100vh, 100vw) * (1 / 14));
    }

    .picture {
      position: relative;
      width: calc(min(100vh, 100vw) * (2 / 7));
      height: calc(min(100vh, 100vw) * (2 / 7));
      flex-shrink: 0;
    }

    .frame {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    .picture .monster {
      position: absolute;
      width: calc(min(100vh, 100vw) * (1 / 7));
      height: calc(min(100vh, 100vw) * (1 / 7));
      top: calc(min(100vh, 100vw) * (1 / 14));
      right: calc(min(100vh, 100vw) * (1 / 14));
    }

    dd-monster {
      box-sizing: border-box;

      background: url("${unsafeCSS(monsterInfoURL)}");
      background-size: contain;
      background-repeat: no-repeat;

      position: relative;
      width: calc(min(100vh, 100vw) * (2 / 7));
      height: calc(min(100vh, 100vw) * (2 / 7));

      flex-shrink: 0;
    }

    dd-summary {
      flex-grow: 1;
      margin: 1em;
    }

    .button {
      background: url("${unsafeCSS(lightButtonURL)}");
      background-size: contain;
      height: 3em;
      aspect-ratio: 190 / 49;
      border: none;
      cursor: pointer;
      font-family: "Kenney Square", sans-serif;
      color: #272b42;
      padding-bottom: 4px;
    }
  `;

  onPlayerRoll(event: CustomEvent) {
    const playerRoll = [...event.detail.roll];
    const monsterHand = randomHand(this.monster.deck, this.monster.handSize);
    const monsterRoll = rollHand(monsterHand);
    this.evaluateRound({
      player: { ...this.player },
      monster: { ...this.monster },
      playerRoll: [...playerRoll],
      monsterRoll: [...monsterRoll],
    });
    this.monsterRoll = monsterRoll;
    this.playerRoll = playerRoll;
  }

  evaluateRound(round: Round) {
    const playerEffects = evaluateRoll(round.playerRoll);
    const monsterEffects = evaluateRoll(round.monsterRoll);

    const playerDamage = Math.max(
      0,
      playerEffects.damage - monsterEffects.shield
    );
    const monsterDamage = Math.max(
      0,
      monsterEffects.damage - playerEffects.shield
    );

    if (monsterDamage) {
      playRandomSound(GLITCH_SOUNDS);
    }

    if (playerDamage) {
      playRandomSound(CLOSE_SOUNDS);
    }

    const monster = { ...this.monster };
    const player = { ...this.player };

    monster.health -= playerDamage;
    monster.health -= monsterEffects.backfire;
    if (monster.health <= 0) {
      monster.health = 0;
      player.health -= playerEffects.backfire;
      player.health += playerEffects.heal;

      this.dispatchEvent(
        new CustomEvent("dd-fight-update", {
          detail: {
            monster,
            player,
          },
        })
      );
      this.rounds = [...this.rounds, round];
      this.state = "win";
      playRandomSound(POWER_UP_SOUNDS);
      return;
    }

    player.health -= monsterDamage;
    player.health -= playerEffects.backfire;
    if (player.health <= 0) {
      player.health = 0;

      this.dispatchEvent(
        new CustomEvent("dd-fight-update", {
          detail: {
            monster,
            player,
          },
        })
      );
      this.rounds = [...this.rounds, round];
      this.state = "lose";
      return;
    }

    monster.health += monsterEffects.heal;
    player.health += playerEffects.heal;

    player.money += playerEffects.money;
    player.money = Math.max(player.money - monsterEffects.money, 0);

    this.dispatchEvent(
      new CustomEvent("dd-fight-update", {
        detail: {
          monster,
          player,
        },
      })
    );

    this.rounds = [...this.rounds, round];
  }

  onAckWin() {
    this.dispatchEvent(new CustomEvent("dd-fight-win"));
  }

  onAckLose() {
    this.dispatchEvent(new CustomEvent("dd-fight-lose"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-fight": FightElement;
  }
}
