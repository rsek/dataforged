import type { PlayerConditionMeter , Stat } from "@json_out/index.js";
import { MoveOutcome , RollType } from "@json_out/index.js";
import type { IIronswornRoll, IronswornRoll } from "@utils/simulation/IronswornRoll.js";
import { ActionRoll , resolveIronswornRoll } from "@utils/simulation/IronswornRoll.js";
import type { IOutcomesNumbers, IOutcomeWithNumbers } from "@utils/simulation/OutcomeWithNumbers.js";
import { OutcomeEvent } from "@utils/simulation/OutcomeWithNumbers.js";
import { randomizeStats } from "@utils/simulation/randomizeStats.js";
import type { ProgressTrack } from "@utils/simulation/Track.js";
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

export interface IPlayerCharacter {
  name: string;
  momentum: number;
  impacts: string[];
  stats: Record<Stat,number>;
  meters: Record<PlayerConditionMeter,number>
  effects: {add: number} // how much to add to the next action roll
  moveChoiceStrategy: (OutcomeEvent)[]
}

export class PlayerCharacter implements IPlayerCharacter {
  name: string;
  private _momentum: number;
  private _moveChoiceStrategy: (OutcomeEvent)[] = [];
  public get moveChoiceStrategy(): (OutcomeEvent)[] {
    if (this.momentum === this.momentumMax) {
      return this._moveChoiceStrategy.filter(item => Object.keys(item).includes(OutcomeEvent.momentum));
    }
    return this._moveChoiceStrategy;
  }
  public set moveChoiceStrategy(value: (OutcomeEvent)[]) {
    this._moveChoiceStrategy = value;
  }
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
    moveChoiceStrategy = [ OutcomeEvent.markProgress, OutcomeEvent.momentum, OutcomeEvent.add ]
  }: { name?: string, meters?: Record<PlayerConditionMeter, number>; momentum?: number; stats?: Record<Stat, number>; moveChoiceStrategy?: OutcomeEvent[]} = {}) {
    this.name = name;
    this.stats = stats;
    this.meters = meters;
    this._momentum = momentum;
    this.moveChoiceStrategy = moveChoiceStrategy;
  }
  effects: { add: number; } = { add: 0 };
  pickMoveChoice(data: IOutcomeWithNumbers & {choose: NonNullable<IOutcomeWithNumbers["choose"]>}) {
    const clone = _.cloneDeep(data);
    let result: Partial<Record<OutcomeEvent, number>> = {};
    if (clone.choose.amount >  clone.choose.from.length) {
      throw new RangeError("Not enough choices available.");
    }
    if (clone.choose.amount === clone.choose.from.length) {
      result = _.merge(result,data.choose.from);
    } else {
      for (let i = 0; i < this.moveChoiceStrategy.length; i++) {
        const item = this.moveChoiceStrategy[i];
        const toAdd = _.remove(clone.choose.from, value => value === item);
        if (toAdd) {
          result = _.merge(result, toAdd);
        }
      }
    }
    while (Object.keys(result).length < data.choose.amount) {
      _.merge(result, clone.choose.from.shift());
    }
    return _.merge(clone, result);
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
  applyResult(data: IOutcomeWithNumbers) {
    // console.log("received outcome data", data);
    let result = data;
    if (result.choose) {
      result = this.pickMoveChoice(result as Required<typeof result>);
    }
    this.momentum += result.momentum;
    this.effects.add += result.add;
    // console.log(this);
  }
  decideMomentum(roll: IronswornRoll, alwaysBurnAt: number = this.momentumMax, log: boolean = false) {
    let useMomentumFlag = false;
    if (this.canBurnMomentumOn(roll)) {
      // if this happens somehow, might as well burn with no loss
      // if (this.momentum === this.momentumReset) {
      //   useMomentumFlag = true;
      // }
      // if
      if (alwaysBurnAt && this.momentum >= alwaysBurnAt) {
        useMomentumFlag = true;
      }
      let currentResult = _.cloneDeep(roll.resultInfo);
      let newResult = _.cloneDeep(roll.resultForScore(this.momentum,roll.isMatch));

      if (currentResult.choose) {
        currentResult= this.pickMoveChoice(currentResult as IOutcomeWithNumbers & {choose: NonNullable<IOutcomeWithNumbers["choose"]>});
      }
      if (newResult.choose) {
        newResult= this.pickMoveChoice(newResult as IOutcomeWithNumbers & {choose: NonNullable<IOutcomeWithNumbers["choose"]>});
      }
      // TODO: burn if clock would be incremented when clock is close to full
      if (currentResult.clock > newResult.clock) {
        useMomentumFlag = true;
      }
      if (currentResult.markProgress < newResult.markProgress) {
        useMomentumFlag = true;
      }
    }
    return useMomentumFlag;
  }
  evaluateActionRoll({ resultsData, stat, progressTrack, log = false, name = "Move" }: { resultsData: IOutcomesNumbers; stat: number; progressTrack?: ProgressTrack; log?: boolean; name?: string }) {
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
    if (this.decideMomentum(roll, this.momentumMax, log)) {
      roll.burntMomentum = this.momentum.valueOf();
      this.resetMomentum();
      if (log){
        console.log(`${this.name} burns ${this.momentum} momentum for a ${MoveOutcome[roll.outcome]}!`);
      }
    }
    this.applyResult(roll.resultInfo);
    if (progressTrack) {
      progressTrack.applyResult(roll.resultInfo);
    }
  }
}