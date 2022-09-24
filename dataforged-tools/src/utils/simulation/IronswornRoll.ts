import { MoveOutcome , RollType } from "@json_out";
import { Die } from "@utils/simulation/Die.js";
import type { NumericOutcome, NumericOutcomes } from "@utils/simulation/NumericOutcomes.js";
import { MOMENTUM_MAX } from "@utils/simulation/PlayerCharacter.js";
import _ from "lodash-es";

export const MAX_SCORE = 10;
export const CHALLENGE_DIE_SIDES = 10;
export const ACTION_DIE_SIDES = 6;

/**
 * Resolves an Ironsworn roll to a strong hit, weak hit, or miss. Used to
 * @param score - The score to test the challenge dice against.
 * @param challengeDie1 - The first challenge die.
 * @param challengeDie2 - The second challenge die.
 */
export function resolveIronswornRoll(score: number, challengeDie1: Die, challengeDie2: Die ): MoveOutcome {
  console.log("Resolving ironsworn roll:", ...arguments);

  const diceBeaten = [ challengeDie1, challengeDie2 ].filter(die => score > die.valueOf()).length;
  return diceBeaten;
}

export interface IronswornRoll {
  type: RollType;
  challengeDice: [Die, Die];
  score: number;
  outcome: MoveOutcome;
  isMatch: boolean;
  outcomeEffect: NumericOutcome<this["outcome"]>;
}



export abstract class IronswornRoll implements IronswornRoll {
  readonly type: RollType;
  challengeDice: [Die, Die];
  private readonly _outcomesData: NumericOutcomes;
  outcomeForScore(score: number): MoveOutcome {
    return resolveIronswornRoll(score, ...this.challengeDice);
  }
  outcomeEffectForScore(score: number, isMatch: boolean): NumericOutcome<MoveOutcome> {
    const outcomeKey = MoveOutcome[this.outcomeForScore(score)] as keyof typeof MoveOutcome;
    let baseOutcome = _.cloneDeep(this._outcomesData[outcomeKey]);
    if (isMatch && baseOutcome.chooseOnMatch) {
      baseOutcome = _.merge(baseOutcome, baseOutcome.chooseOnMatch);
    }
    return baseOutcome;
  }
  get outcomeEffect(): NumericOutcome<MoveOutcome> {
    return this.outcomeEffectForScore(this.score, this.isMatch);
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
  constructor({ type, outcomesData: resultsData, challengeDie1 = new Die(CHALLENGE_DIE_SIDES), challengeDie2 = new Die(CHALLENGE_DIE_SIDES) }: { type: RollType; outcomesData: NumericOutcomes; challengeDie1?: number | Die; challengeDie2?: number | Die; }) {
    this.type = type;
    this._outcomesData = resultsData;
    this.challengeDice = [ challengeDie1, challengeDie2 ].map(die => typeof die === "number" ? new Die(CHALLENGE_DIE_SIDES, die): die) as [Die,Die];
  }
}

export interface ProgressRoll extends IronswornRoll {
  type: RollType.Progress;
}

export class ProgressRoll extends IronswornRoll implements ProgressRoll {
  readonly type = RollType.Progress;
  score: number;
  constructor({ score, outcomesData, challengeDie1, challengeDie2 }: { score: number; outcomesData: NumericOutcomes; challengeDie1?: number; challengeDie2?: number; }) {
    super({
      type: RollType.Progress, outcomesData, challengeDie1, challengeDie2
    });
    this.score = score;
  }
}

export interface ActionRoll extends IronswornRoll {
  type: RollType.Action;
  actionDie: Die;
  stat: number;
  add: number;
}

export class ActionRoll extends IronswornRoll implements ActionRoll {
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
  constructor({ stat, add = 0, actionDie = _.random(1, ACTION_DIE_SIDES), challengeDie1, challengeDie2, outcomesData }: { outcomesData: NumericOutcomes, stat: number; add: number; actionDie?: number | Die; challengeDie1?: number | Die; challengeDie2?: number | Die;}) {
    super({
      type: RollType.Action, outcomesData, challengeDie1, challengeDie2
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