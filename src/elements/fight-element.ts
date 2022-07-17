import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { SNAKE } from "../monsters";
import { PLAYER } from "../player";
import { Creature, Player, Roll, Round } from "../types";
import { evaluateRoll, randomHand, rollHand } from "../helpers";

import ratURL from "../assets/monsters/rat.png";
import pictureFrameURL from "../assets/PictureFrame.png";
import monsterInfoURL from "../assets/MonsterInfo.png";

import "./player-element";
import "./monster-element";
import "./summary-element";
import "./roll-element";

@customElement("dd-fight")
export class FightElement extends LitElement {
  @property({ type: Object })
  player: Player = { ...PLAYER };

  @property({ type: Object })
  monster: Creature = { ...SNAKE };

  @state()
  rounds: Array<Round> = [];

  @state()
  monsterRoll: Roll = [];

  @state()
  playerRoll: Roll = [];

  render() {
    return html`
      <div class="row">
        <dd-monster
          .name=${this.monster.name}
          .health=${this.monster.health}
          .roll=${this.monsterRoll}
        ></dd-monster>
        <dd-summary .rounds=${this.rounds}></dd-summary>
        <div class="picture">
          <img class="frame" src=${pictureFrameURL} />
          <img class="monster" src=${ratURL} />
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
      <dd-player
        @dd-player-roll=${this.onPlayerRoll}
        .health=${this.player.health}
        .handSize=${this.player.handSize}
        .deck=${this.player.deck}
        .rolls=${this.player.rolls}
      ></dd-player>
    `;
  }
  static styles = css`
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
      justify-content: space-around;
      align-items: center;
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
      this.dispatchEvent(new CustomEvent("dd-fight-win"));
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
      this.dispatchEvent(new CustomEvent("dd-fight-lose"));
      return;
    }

    monster.health += monsterEffects.heal;
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "dd-fight": FightElement;
  }
}
