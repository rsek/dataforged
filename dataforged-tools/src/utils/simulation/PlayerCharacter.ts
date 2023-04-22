import type { PlayerConditionMeter , Stat } from "@json_out/index.js";
import { MoveOutcome , RollType } from "@json_out/index.js";
import type { IAppliesMoveEffect } from "@utils/simulation/IAppliesMoveEffect.js";
import type { IIronswornRoll, IronswornRoll } from "@utils/simulation/IronswornRoll.js";
import { ActionRoll , resolveIronswornRoll } from "@utils/simulation/IronswornRoll.js";
import type { IOutcomeEffectHash, NumericOutcome, NumericOutcomeChoice, NumericOutcomes } from "@utils/simulation/NumericOutcomes.js";
import { OutcomeEffectHash , OutcomeEffectType } from "@utils/simulation/NumericOutcomes.js";
import { ProgressTrackType } from "@utils/simulation/progressConstants.js";
import type { ProgressStrategy } from "@utils/simulation/ProgressStrategy.js";
import type { IProgressTrack } from "@utils/simulation/ProgressTrack.js";
import { randomizeStats } from "@utils/simulation/randomizeStats.js";
import { sceneChallengePriorities } from "@utils/simulation/SceneChallenge.js";
import pkg from "colors";
const { bold,strip,red, blue, green,yellow } = pkg;
import _ from "lodash-es";


export const MOMENTUM_MAX = 10;
export const MOMENTUM_MIN = -6;
export const MOMENTUM_RESET = 2;
export const MOMENTUM_RESET_MIN = 0;
export const CONDITION_METER_MAX = 5;
export const CONDITION_METER_MIN = 0;

export enum BurnStrategy {
  MinimizeClock,
  MaximizeProgress
}

export interface IStat {
  Name: string;
  Value: number;
}

export interface IStatusEffects {
  /**
   * A bonus to be added to the next roll.
   */
  [OutcomeEffectType.add]: number
  /**
   * Whether the PC is "in control" of combat. If false, they're "in a bad spot".
   */
  [OutcomeEffectType.inControl]: boolean
}


export interface IPlayerCharacter {
  name: string;
  momentum: number;
  impacts: string[];
  stats: Record<Stat,number>;
  meters: Record<PlayerConditionMeter,number>
  status: IStatusEffects
  strategy: ProgressStrategy
}

// TODO: assetSimulation prop. could be an array.
// % chance to fire
// add to roll
// momentum on strong hit
// reroll dice
// preset die
// types/IDs of move to fire on?

export class PlayerCharacter implements IPlayerCharacter, IAppliesMoveEffect {
  name: string;
  private _momentum: number;
  strategy: ProgressStrategy;
  public get momentum(): number {
    return this._momentum;
  }
  public set momentum(value: number) {
    this._momentum = _.clamp(value, MOMENTUM_MIN, this.momentumMax);
  }
  public get momentumReset() {
    return Math.max(MOMENTUM_RESET-this.impacts.length, MOMENTUM_RESET_MIN);
  }
  public get momentumMax() {
    return MOMENTUM_MAX - this.impacts.length;
  }
  toString(): string {
    const content = [
      bold(this.name.toUpperCase()),
      `${red(bold("Health"))} ${this.meters.Health}`,
      `${blue(bold("Spirit"))} ${this.meters.Spirit}`,
      `${green(bold("Supply"))} ${this.meters.Supply}`,
      `${yellow(bold("Momentum"))} ${this.momentum > -1 ? "+" : ""}${this.momentum}`.padEnd(4)
    ];
    const border = content.map(item => strip(item).replaceAll(/./ig, "─"));
    const tbl = [
      "┌─"+border.join("─┬─")+"─┐",
      "│ "+content.join(" │ ")+" │",
      "└─"+border.join("─┴─")+"─┘",
    ].join("\n");
    return tbl.toString();
  }
  stats: Record<Stat, number>;
  meters: Record<PlayerConditionMeter, number>;
  impacts: string[] = [];
  constructor({
    name = "Marc Progress",
    meters = {
      Health: 5, Spirit: 5, Supply: 5
    },
    momentum = 2,
    stats = randomizeStats(),
    strategy
  }: { name?: string, meters?: Record<PlayerConditionMeter, number>; momentum?: number; stats?: Record<Stat, number>; strategy: ProgressStrategy}) {
    this.name = name;
    this.stats = stats;
    this.meters = meters;
    this._momentum = momentum;
    this.strategy = strategy;
  }
  status: IStatusEffects = { add: 0, inControl: false };
  pickMoveChoice(outcomeEffect: NumericOutcome<MoveOutcome>, isMatch: boolean, progressTrackType: ProgressTrackType): OutcomeEffectHash {
    const options = isMatch && outcomeEffect.chooseOnMatch ? outcomeEffect.chooseOnMatch : outcomeEffect.choose;
    let results: NumericOutcomeChoice[];
    if (options.amount > options.from.length) {
      throw new Error("Not enough options to choose from");
    }
    let priorityData: OutcomeEffectType[];
    switch (progressTrackType) {
      case ProgressTrackType.SceneChallenge:
        priorityData = sceneChallengePriorities[this.strategy];
        break;
      default:
        throw new Error("NYI");
    }
    if (options.amount === options.from.length) {
      results=options.from;
    }
    let priorities = _.clone(priorityData);
    // exclude momentum if it's full
    if (this.momentum === this.momentumMax) {
      priorities = priorities.filter(item => item !== OutcomeEffectType.momentum);
    }
    results = [];

    while (results.length < options.amount) {
      const choices = _.clone(options.from);
      for (let i = 0; i < priorities.length; i++) {
        const effect = priorities[i];

        if (choices.some(item => item[effect] > 0)) {
          const selection = _.pull(choices, _.minBy(choices, option => option[effect]))[0] as NumericOutcomeChoice;
          results.concat(selection);
          ;
        }
      }
    }
    return new OutcomeEffectHash(...results);
  }
  canBurnMomentumOn(roll: IIronswornRoll) {
    console.log("Checking momentum burn availability");
    if (roll.type !== RollType.Action) {
      return false;
    }
    if (this.momentum > roll.score && resolveIronswornRoll(this.momentum, ...roll.challengeDice) > roll.outcome) {
      return true;
    }
    return false;
  }
  resetMomentum() {
    this._momentum = this.momentumReset;
  }
  applyResult(data: IOutcomeEffectHash) {
    // const toApply=this.selectMoveChoice(roll.outcomeEffect,roll.isMatch,progressTrackType);
    _.forEach(data, (value,key) => {
      switch (key as OutcomeEffectType) {
        case OutcomeEffectType.add:
          this.status.add += value as number;
          break;
        case OutcomeEffectType.momentum:
          this.momentum += value as number;
          break;
        case OutcomeEffectType.inControl:
          this.status.inControl = value as boolean;
          break;
        default:
          break;
      }
    });
  }
  decideMomentum(roll: IronswornRoll, alwaysBurnAt: number = this.momentumMax, progressTrack: IProgressTrack, log: boolean = false) {
    log && console.log("Checking whether momentum can be burnt.");
    let useMomentumFlag = false;
    if (this.canBurnMomentumOn(roll)) {
      log && console.log("Momentum burn available.");
      if (alwaysBurnAt && this.momentum >= alwaysBurnAt) {
        useMomentumFlag = true;
      }
      const rollWithMomentum = roll.outcomeEffectForScore(this.momentum,roll.isMatch);
      const currentOutcome = this.pickMoveChoice(roll.outcomeEffect, roll.isMatch, progressTrack.type);
      const momentumOutcome = this.pickMoveChoice(rollWithMomentum, roll.isMatch, progressTrack.type);


      // could merge to a single object for easy checking.
      // alternately, iterate over them and tabulate?
      // that might be the best way to apply
      if (currentOutcome.markProgress < momentumOutcome.markProgress) {
        // if the new result marks more progress, burn to take it
        useMomentumFlag = true;
      }
      if (progressTrack.clock) {
        if ((currentOutcome.tickClock + progressTrack.clock.filled) >= progressTrack.clock.segments) {
          // if the clock would be filled, use momentum since there's nothing to lose
          useMomentumFlag = true;
        }
        if (currentOutcome.tickClock > momentumOutcome.tickClock) {
          // if the new result ticks fewer segments, burn to avoid
          useMomentumFlag = true;
        }
      }
    }
    return useMomentumFlag;
  }
  evaluateActionRoll({ outcomesData, stat, progressTrack, log = false, name = "Move" }: { outcomesData: NumericOutcomes; stat: number; progressTrack: IProgressTrack; log?: boolean; name?: string }) {
    const roll = new ActionRoll({
      stat, add: this.status.add.valueOf(), outcomesData
    });
    log &&  console.log(`${this.name} rolls ${name}. ${roll.toString()}`);
    if (this.status.add > 0) {this.status.add = 0;}
    if (this.decideMomentum(roll, this.momentumMax, progressTrack, log)) {
      roll.burntMomentum = this.momentum.valueOf();
      this.resetMomentum();

      log && console.log(`${this.name} burns ${this.momentum} momentum for a ${MoveOutcome[roll.outcome]}!`);
    }
    const outcomeEffect = this.pickMoveChoice(roll.outcomeEffect, roll.isMatch, progressTrack.type);

    [ this, progressTrack ].forEach(item => item.applyResult(outcomeEffect));
  }
}