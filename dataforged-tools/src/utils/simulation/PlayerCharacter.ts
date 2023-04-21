import type { PlayerConditionMeter , Stat } from "@json_out/index.js";
import { MoveOutcome , RollType } from "@json_out/index.js";
import type { IIronswornRoll, IronswornRoll } from "@utils/simulation/IronswornRoll.js";
import { ActionRoll , resolveIronswornRoll } from "@utils/simulation/IronswornRoll.js";
import type { INumericOutcomes , NumericOutcome, NumericOutcomeChoice } from "@utils/simulation/NumericOutcomes.js";
import { OutcomeEffectType } from "@utils/simulation/NumericOutcomes.js";
import type { ProgressStrategy } from "@utils/simulation/ProgressStrategy";
import { randomizeStats } from "@utils/simulation/randomizeStats.js";
import { sceneChallengePriorities } from "@utils/simulation/SceneChallenge.js";
import type { IProgressTrack, ProgressTrack } from "@utils/simulation/Track.js";
import { ProgressTrackType , Track } from "@utils/simulation/Track.js";
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

export interface IPCEffects {
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
  effects: IPCEffects
  strategy: ProgressStrategy
}

// TODO: assetSimulation prop. could be an array.
// % chance to fire
// add to roll
// momentum on strong hit
// reroll dice
// preset die
// types/IDs of move to fire on?

export class PlayerCharacter implements IPlayerCharacter {
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
    return `${this.name}: 🩸${this.meters.Health} ✨${this.meters.Spirit} 🎒${this.meters.Supply} 🌀${this.momentum > -1 ? "+" : ""}${this.momentum}`;
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
  effects: IPCEffects = { add: 0, inControl: false };
  selectMoveChoice(outcomeEffect: NumericOutcome<MoveOutcome>, isMatch: boolean, progressTrack: ProgressTrack): NumericOutcomeChoice[] {
    const options = isMatch && outcomeEffect.chooseOnMatch ? outcomeEffect.chooseOnMatch : outcomeEffect.choose;
    if (options.amount > options.from.length) {
      throw new Error("Not enough options to choose from");
    }
    let priorityData: OutcomeEffectType[];
    switch (progressTrack.type) {
      case ProgressTrackType.SceneChallenge:
        priorityData = sceneChallengePriorities[this.strategy];
        break;
      default:
        throw new Error("NYI");
    }
    if (options.amount === options.from.length) {
      return options.from;
    }
    let priorities = _.clone(priorityData);
    // exclude momentum if it's full
    if (this.momentum === this.momentumMax) {
      priorities = priorities.filter(item => item !== OutcomeEffectType.momentum);
    }
    const result: NumericOutcomeChoice[] = [];

    while (result.length < options.amount) {
      const choices = _.clone(options.from);
      for (let i = 0; i < priorities.length; i++) {
        const effect = priorities[i];

        if (choices.some(item => item[effect] > 0)) {
          const selection = _.pull(choices, _.minBy(choices, option => option[effect]))[0] as NumericOutcomeChoice;
          result.concat(selection);
          ;
        }
      }
    }
    return result;
    // TODO: build to single object so its easier to compare for priorities?
    // running that for every move seems like A Lot, though. hmm.
  }
  canBurnMomentumOn(roll: IIronswornRoll) {
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
  applyResult(roll: IronswornRoll, progressTrack: ProgressTrack) {
    const toApply= this.selectMoveChoice(roll.outcomeEffect,roll.isMatch,progressTrack);
    toApply.forEach(effect => {
      this.momentum += effect.momentum;
      this.effects.add += effect.add;
    });
  }
  decideMomentum(roll: IronswornRoll, alwaysBurnAt: number = this.momentumMax, progressTrack?: IProgressTrack | undefined, log: boolean = false) {
    let useMomentumFlag = false;
    if (this.canBurnMomentumOn(roll)) {
      if (alwaysBurnAt && this.momentum >= alwaysBurnAt) {
        useMomentumFlag = true;
      }
      const currentResult = _.cloneDeep(roll.outcomeEffect);
      const newResult = _.cloneDeep(roll.outcomeEffectForScore(this.momentum,roll.isMatch));

      if (progressTrack) {
        // could merge to a single object for easy checking.
        // alternately, iterate over them and tabulate?
        // that might be the best way to apply
        if (currentResult.markProgress < newResult.markProgress) {
          // if the new result marks more progress, burn to take it
          useMomentumFlag = true;
        }
        if (progressTrack.clock) {
          if ((currentResult.clock + progressTrack.clock.filled) >= progressTrack.clock.segments) {
            // if the clock would be filled, use momentum since there's nothing to lose
            useMomentumFlag = true;
          }
          if (currentResult.clock > newResult.clock) {
            // if the new result ticks fewer segments, burn to avoid
            useMomentumFlag = true;
          }
        }
      }
    }
    return useMomentumFlag;
  }
  evaluateActionRoll({ resultsData, stat, progressTrack, log = false, name = "Move" }: { resultsData: INumericOutcomes; stat: number; progressTrack?: ProgressTrack; log?: boolean; name?: string }) {
    const roll = new ActionRoll({
      stat, add: this.effects.add.valueOf(), resultsData
    });
    if (log) {
      let msg = `${this.name} rolls ${name}`;
      if (roll.add) {
        msg+= ` (adds: +${roll.add})`;
      }
      console.log(`${msg}. ${roll.toString()}`);
    }
    if (this.effects.add > 0) {this.effects.add = 0;}
    if (this.decideMomentum(roll, this.momentumMax, progressTrack, log)) {
      roll.burntMomentum = this.momentum.valueOf();
      this.resetMomentum();
      if (log){
        console.log(`${this.name} burns ${this.momentum} momentum for a ${MoveOutcome[roll.outcome]}!`);
      }
    }
    this.applyResult(roll.outcomeEffect);
    if (progressTrack) {
      progressTrack.applyResult(roll.outcomeEffect);
    }
  }
}