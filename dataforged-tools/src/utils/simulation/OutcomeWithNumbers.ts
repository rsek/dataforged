import type { MoveOutcome } from "@json_out/index.js";
import _ from "lodash-es";


export enum OutcomeEvent {
  momentum = "momentum",
  add = "add",
  markProgress = "markProgress",
  clock = "clock"
}

export const blankOutcomes: IOutcomesNumbers = {
  "Strong Hit": {
    add: 0,
    clock: 0,
    markProgress: 0,
    momentum: 0
  },
  "Weak Hit": {
    add: 0,
    clock: 0,
    markProgress: 0,
    momentum: 0
  },
  Miss: {
    add: 0,
    clock: 0,
    markProgress: 0,
    momentum: 0
  }
};

export interface IOutcomeWithNumbers  {
  [OutcomeEvent.momentum]: number;
  [OutcomeEvent.add]: number;
  [OutcomeEvent.markProgress]: number;
  [OutcomeEvent.clock]: number;
  choose?: {
    amount: number;
    from: Partial<Record<OutcomeEvent, number>>[]
  },
  match?: Partial<IOutcomeWithNumbers> & {match?: never} | undefined;
}

export interface IOutcomesNumbers extends Record<keyof typeof MoveOutcome, IOutcomeWithNumbers>{
  "Strong Hit": IOutcomeWithNumbers
  "Weak Hit": IOutcomeWithNumbers & {match?: never};
  "Miss": IOutcomeWithNumbers
}