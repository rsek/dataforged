import type { ClockSegments } from "@json_out";
import { ClockType } from "@json_out";
import type { AppliesMoveEffect } from "@utils/simulation/AppliesMoveEffect.js"; AppliesMoveEffect
import type { IOutcomeEffectHash } from "@utils/simulation/NumericOutcomes.js";
import _ from "lodash-es";


export interface Clock extends AppliesMoveEffect {
  type: ClockType;
  segments: ClockSegments;
  filled: number;
  applyResult(data: OutcomeEffectHash): void;
}

export abstract class Clock implements Clock { Clock
  applyResult(data: IOutcomeEffectHash): void {
    this.filled += data.tickClock;
  }
  readonly segments: ClockSegments;
  readonly type: ClockType;
  private _filled: number;
  public get filled(): number {
    return this._filled;
  }
  public set filled(value: number) {
    this._filled = _.clamp(value, 0, this.segments);
  }
  constructor(type: ClockType, segments: ClockSegments, filled: number = 0) {
    this.type = type;
    this.segments = segments;
    this._filled = filled;
  }
}

export class TensionClock extends Clock {
  readonly type = ClockType.Tension;
  constructor(segments: ClockSegments, filled: number = 0) {
    super(ClockType.Tension, segments, filled);
  }
}

export class CampaignClock extends Clock {
  readonly type = ClockType.Campaign;
  constructor(segments: ClockSegments, filled: number = 0) {
    super(ClockType.Campaign, segments, filled);
  }
}
