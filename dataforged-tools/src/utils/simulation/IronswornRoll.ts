import { MoveOutcome } from "@json_out/index.js";
import { Die } from "@utils/simulation/Die.js";
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
  challengeDice: [Die, Die];
  score: number;
  outcome: MoveOutcome;
  isMatch: boolean;
}

export abstract class IronswornRoll implements IIronswornRoll {
  challengeDice: [Die, Die];
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
  constructor(challengeDie1: number|Die = new Die(CHALLENGE_DIE_SIDES), challengeDie2: number|Die = new Die(CHALLENGE_DIE_SIDES)) {
    this.challengeDice = [ challengeDie1, challengeDie2 ].map(die => typeof die === "number" ? new Die(CHALLENGE_DIE_SIDES, die): die) as [Die,Die];
  }
}

export class ProgressRoll extends IronswornRoll {
  score: number;
  constructor(score: number, challengeDie1?: number, challengeDie2?: number) {
    super(challengeDie1, challengeDie2);
    this.score = score;
  }
}


export interface IActionRoll extends IIronswornRoll {
  actionDie: Die;
  stat: number;
  add: number;
}


export class ActionRoll extends IronswornRoll implements IActionRoll {
  actionDie: Die;
  stat: number;
  add: number;
  get score() {
    return _.clamp(_.sum([ this.actionDie, this.stat, this.add ]), MAX_SCORE)
    ;
  }
  override toString() {
    return `${this.actionDie.toString()} + ${this.stat} + ${this.add} = ${super.toString()}`;
  }
  constructor(stat: number, add: number = 0, actionDie: number|Die = _.random(1,ACTION_DIE_SIDES), challengeDie1?: number|Die, challengeDie2?: number|Die) {
    super(challengeDie1, challengeDie2);
    if (typeof actionDie === "number") {
      this.actionDie = new Die(ACTION_DIE_SIDES, actionDie);
    } else {
      this.actionDie = actionDie;
    }
    this.stat = stat;
    this.add = add;
  }
}