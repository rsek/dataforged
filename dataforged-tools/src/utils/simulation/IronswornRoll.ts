import { MoveOutcome , RollType } from "@json_out/index.js";
import { Die } from "@utils/simulation/Die.js";
import type { IOutcomesNumbers, IOutcomeWithNumbers } from "@utils/simulation/OutcomeWithNumbers.js";
import { blankOutcomes } from "@utils/simulation/OutcomeWithNumbers.js";
import { MOMENTUM_MAX } from "@utils/simulation/PlayerCharacter.js";
import _ from "lodash-es";

export const MAX_SCORE = 10;
export const CHALLENGE_DIE_SIDES = 10;
export const ACTION_DIE_SIDES = 6;

/**
 * Resolves an Ironsworn roll to a strong hit, weak hit, or miss.
 * @param score - The score to test the challenge dice against.
 * @param challengeDie1 - The first challenge die.
 * @param challengeDie2 - The second challenge die.
 */
export function resolveIronswornRoll(score: number, challengeDie1: Die, challengeDie2: Die ): MoveOutcome {
  const challengeDice = [ challengeDie1, challengeDie2 ];
  let diceBeaten = 0;
  challengeDice.forEach(die => {
    if (score > die.valueOf()) {diceBeaten++;}
  });
  switch (diceBeaten) {
    case 2:
      return MoveOutcome["Strong Hit"];
    case 1:
      return MoveOutcome["Weak Hit"];
    case 0:
      return MoveOutcome["Miss"];
    default:
      throw new Error();
  }
}

export interface IIronswornRoll {
  type: RollType;
  challengeDice: [Die, Die];
  score: number;
  outcome: MoveOutcome;
  isMatch: boolean;
  resultInfo: IOutcomeWithNumbers;
}



export abstract class IronswornRoll implements IIronswornRoll {
  readonly type: RollType;
  challengeDice: [Die, Die];
  private readonly _resultsData: IOutcomesNumbers;

  outcomeForScore(score: number) {
    return resolveIronswornRoll(score, ...this.challengeDice);
  }
  resultForScore(score: number, isMatch: boolean) {
    const outcomeKey = MoveOutcome[this.outcomeForScore(score)] as keyof typeof MoveOutcome;
    let baseOutcome = _.cloneDeep(this._resultsData[outcomeKey]);
    if (isMatch && baseOutcome.match) {
      baseOutcome = _.merge(baseOutcome, baseOutcome.match);
    }
    return baseOutcome;
  }
  get resultInfo() {
    return this.resultForScore(this.score, this.isMatch);
  }
  toString(): string {
    return `${this.score} vs. ${this.challengeDice.join(", ")}: ${MoveOutcome[this.outcome]}${this.isMatch? " with a match" : ""}`;
  }
  abstract score: number;
  public get outcome(): MoveOutcome {
    return resolveIronswornRoll(this.score, ...this.challengeDice);
  }
  get isMatch() {
    return !!(this.challengeDice[0].valueOf() === this.challengeDice[1].valueOf());
  }
  constructor({ type, resultsData, challengeDie1 = new Die(CHALLENGE_DIE_SIDES), challengeDie2 = new Die(CHALLENGE_DIE_SIDES) }: { type: RollType; resultsData: IOutcomesNumbers; challengeDie1?: number | Die; challengeDie2?: number | Die; }) {
    this.type = type;
    this._resultsData = resultsData;
    this.challengeDice = [ challengeDie1, challengeDie2 ].map(die => typeof die === "number" ? new Die(CHALLENGE_DIE_SIDES, die): die) as [Die,Die];
  }
}

export interface IProgressRoll extends IIronswornRoll {
  type: RollType.Progress;
}

export class ProgressRoll extends IronswornRoll implements IProgressRoll {
  readonly type = RollType.Progress;
  score: number;
  constructor({ score, resultsData = blankOutcomes, challengeDie1, challengeDie2 }: { score: number; resultsData?: IOutcomesNumbers; challengeDie1?: number; challengeDie2?: number; }) {
    super({
      type: RollType.Progress, resultsData, challengeDie1, challengeDie2
    });
    this.score = score;
  }
}


export interface IActionRoll extends IIronswornRoll {
  type: RollType.Action;
  actionDie: Die;
  stat: number;
  add: number;
}


export class ActionRoll extends IronswornRoll implements IActionRoll {
  readonly type = RollType.Action;
  actionDie: Die;
  stat: number;
  add: number;
  private _burntMomentum: number = 0;
  public get burntMomentum(): number {
    return this._burntMomentum;
  }
  public set burntMomentum(value: number) {
    this._burntMomentum = _.clamp(value, 0, MOMENTUM_MAX);
  }
  get score() {
    const scoreAfterMomentum = Math.max(_.sum([ this.actionDie, this.stat, this.add ]), this.burntMomentum);
    return _.clamp(scoreAfterMomentum, MAX_SCORE)
    ;
  }
  override toString() {
    return `${this.actionDie.toString()} + ${this.stat} + ${this.add} = ${super.toString()}`;
  }
  constructor({ stat, add = 0, actionDie = _.random(1, ACTION_DIE_SIDES), challengeDie1, challengeDie2, resultsData }: { resultsData: IOutcomesNumbers, stat: number; add: number; actionDie?: number | Die; challengeDie1?: number | Die; challengeDie2?: number | Die;}) {
    super({
      type: RollType.Action, resultsData, challengeDie1, challengeDie2
    });
    if (typeof actionDie === "number") {
      this.actionDie = new Die(ACTION_DIE_SIDES, actionDie);
    } else {
      this.actionDie = actionDie;
    }
    this.stat = stat;
    this.add = add;
  }
}