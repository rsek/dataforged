import { MoveOutcome } from "@json_out";
import _ from "lodash-es";


export enum OutcomeEffectType {
  momentum = "momentum",
  add = "add",
  markProgress = "markProgress",
  tickClock = "tickClock",
  inControl = "inControl"
}

export interface NumericOutcome<T extends MoveOutcome> {
  outcome?: T|undefined,
  choose: NumericOutcomeParams
  chooseOnMatch?: NumericOutcomeParams | undefined;
}

export interface NumericOutcomeParams {
    amount?: number | undefined;
    from: NumericOutcomeChoice[];
}

export class NumericOutcomeParams implements NumericOutcomeParams {
  amount: number=1;
  from: NumericOutcomeChoice[];
  constructor(outcome: MoveOutcome,{ amount=1, from }: NumericOutcomeParams) {
    this.amount = amount;
    this.from = from.map(item => new NumericOutcomeChoice(outcome, item));
  }
}

export class NumericOutcome<T extends MoveOutcome> implements NumericOutcome<T> {
  name: string;
  outcome: T;
  choose: NumericOutcomeParams;
  chooseOnMatch?: NumericOutcomeParams | undefined;
  constructor(moveName: string, outcome: T, { choose, chooseOnMatch }: NumericOutcome<T>) {
    this.name = moveName;
    this.outcome = outcome;
    this.choose = new NumericOutcomeParams(outcome, choose);
    if (chooseOnMatch) {
      this.chooseOnMatch = new NumericOutcomeParams(outcome, chooseOnMatch);
    }
  }
}

export interface NumericOutcomeChoice {
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
  constructor(outcome: MoveOutcome, { add=0, tickClock=0, markProgress=0, momentum=0, inControl=(outcome === MoveOutcome["Strong Hit"] ? true : false) }: NumericOutcomeChoice) {
    this[OutcomeEffectType.add] = add;
    this[OutcomeEffectType.tickClock] = tickClock;
    this[OutcomeEffectType.markProgress] = markProgress;
    this[OutcomeEffectType.momentum] = momentum;
    this[OutcomeEffectType.inControl] = inControl;
  }
}

export interface NumericOutcomes extends Record<keyof typeof MoveOutcome, NumericOutcome<MoveOutcome>> { NumericOutcomes  NumericOutcomes  NumericOutcomes
  "Strong Hit": INumericOutcome<typeof MoveOutcome["Strong Hit"]>;
  "Weak Hit": INumericOutcome<typeof MoveOutcome["Weak Hit"]>;
  "Miss": INumericOutcome<typeof MoveOutcome.Miss>;
}

export class NumericOutcomes implements NumericOutcomes {
  "Strong Hit": NumericOutcome<typeof MoveOutcome["Strong Hit"]>;
  "Weak Hit": NumericOutcome<typeof MoveOutcome["Weak Hit"]>;
  "Miss": NumericOutcome<typeof MoveOutcome.Miss>;
  constructor(moveName: string, data: Omit<NumericOutcomes, "name">) {
    this["Strong Hit"] = new NumericOutcome(moveName,MoveOutcome["Strong Hit"],data["Strong Hit"]);
    this["Weak Hit"] = new NumericOutcome(moveName,MoveOutcome["Weak Hit"],data["Weak Hit"]);
    this["Miss"] = new NumericOutcome(moveName,MoveOutcome["Miss"],data["Miss"]);
  }
}

export interface OutcomeEffectHash extends Record<OutcomeEffectType, number|boolean> {
  [OutcomeEffectType.add]: number;
  [OutcomeEffectType.tickClock]: number;
  [OutcomeEffectType.markProgress]: number;
  [OutcomeEffectType.momentum]: number;
  [OutcomeEffectType.inControl]: boolean;
}

export class OutcomeEffectHash implements OutcomeEffectHash {
  [OutcomeEffectType.add]: number=0;
  [OutcomeEffectType.tickClock]: number=0;
  [OutcomeEffectType.markProgress]: number=0;
  [OutcomeEffectType.momentum]: number=0;
  [OutcomeEffectType.inControl]: boolean=false;
  addEffect(...items: NumericOutcomeChoice[]) {
    items.forEach(item => {
      _.mergeWith<OutcomeEffectHash, NumericOutcomeChoice>(this, item, (value:number|boolean, srcValue: typeof value) => {
        if (typeof value !== typeof srcValue) {
          throw new Error("value and srcValue aren't the same primitive type!");
        }
        if (typeof value === "number" && typeof srcValue === "number") {
          value += srcValue;
        } else if (typeof value === "boolean" && typeof srcValue === "boolean") {
          value = srcValue;
        }
      });
    });
  }
  constructor(...items: NumericOutcomeChoice[]) {
    this.addEffect(...items);
  }
}