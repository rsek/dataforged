import { MoveOutcome } from "@json_out/index.js";
import _ from "lodash-es";


export enum OutcomeEffectType {
  momentum = "momentum",
  add = "add",
  markProgress = "markProgress",
  tickClock = "tickClock",
  inControl = "inControl"
}

export interface INumericOutcome<T extends MoveOutcome> {
  outcome: T,
  choose: INumericOutcomeParams
  chooseOnMatch?: INumericOutcomeParams | undefined;
}

export interface INumericOutcomeParams {
    amount?: number | undefined;
    from: Partial<INumericOutcomeChoice>[];
}

export class NumericOutcomeParams implements INumericOutcomeParams {
  amount: number=1;
  from: NumericOutcomeChoice[];
  constructor(outcome: MoveOutcome,{ amount=1, from }: INumericOutcomeParams) {
    this.amount = amount;
    this.from = from.map(item => new NumericOutcomeChoice(outcome, item));
  }
}

export class NumericOutcome<T extends MoveOutcome> implements INumericOutcome<T> {
  name: string;
  outcome: T;
  choose: NumericOutcomeParams;
  chooseOnMatch?: NumericOutcomeParams | undefined;
  constructor(moveName: string, { outcome, choose, chooseOnMatch }: INumericOutcome<T>) {
    this.name = moveName;
    this.outcome = outcome;
    this.choose = new NumericOutcomeParams(outcome, choose);
    if (chooseOnMatch) {
      this.chooseOnMatch = new NumericOutcomeParams(outcome, chooseOnMatch);
    }
  }
}

export interface INumericOutcomeChoice {
  [OutcomeEffectType.add]?: number;
  [OutcomeEffectType.tickClock]?: number;
  [OutcomeEffectType.markProgress]?: number;
  [OutcomeEffectType.momentum]?: number;
  /**
   * Whether this choice leaves the PC in control or not. Defaults to `true` if it's a strong hit, and `false` for weak hits and misses.
   */
  [OutcomeEffectType.inControl]?: boolean;
}

export class NumericOutcomeChoice {
  [OutcomeEffectType.add] = 0;
  [OutcomeEffectType.tickClock] = 0;
  [OutcomeEffectType.markProgress] = 0;
  [OutcomeEffectType.momentum] = 0;
  [OutcomeEffectType.inControl] = false;
  constructor(outcome: MoveOutcome, { add=0, tickClock=0, markProgress=0, momentum=0, inControl=(outcome === MoveOutcome["Strong Hit"] ? true : false) }: INumericOutcomeChoice) {
    this[OutcomeEffectType.add] = add;
    this[OutcomeEffectType.tickClock] = tickClock;
    this[OutcomeEffectType.markProgress] = markProgress;
    this[OutcomeEffectType.momentum] = momentum;
    this[OutcomeEffectType.inControl] = inControl;
  }
}

export interface INumericOutcomes extends Record<keyof typeof MoveOutcome, INumericOutcome<MoveOutcome>> {
  "Strong Hit": INumericOutcome<typeof MoveOutcome["Strong Hit"]>;
  "Weak Hit": INumericOutcome<typeof MoveOutcome["Weak Hit"]>;
  "Miss": INumericOutcome<typeof MoveOutcome.Miss>;
}

export class NumericOutcomes implements INumericOutcomes {
  "Strong Hit": NumericOutcome<typeof MoveOutcome["Strong Hit"]>;
  "Weak Hit": NumericOutcome<typeof MoveOutcome["Weak Hit"]>;
  "Miss": NumericOutcome<typeof MoveOutcome.Miss>;
  constructor(moveName: string, data: Omit<INumericOutcomes, "name">) {
    this["Strong Hit"] = new NumericOutcome<typeof MoveOutcome["Strong Hit"]>(moveName, data["Strong Hit"]);
    this["Weak Hit"] = new NumericOutcome<typeof MoveOutcome["Weak Hit"]>(moveName, data["Weak Hit"]);
    this["Miss"] = new NumericOutcome<typeof MoveOutcome["Miss"]>(moveName, data["Miss"]);
  }
}