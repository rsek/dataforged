import { ChallengeRank } from "@json_out/index.js";
import type { IClock } from "@utils/simulation/Clock.js";
import { Die } from "@utils/simulation/Die.js";
import type { INumericOutcomes, NumericOutcomes, OutcomeEffectHash } from "@utils/simulation/NumericOutcomes.js";
import type { ProgressTrackType } from "@utils/simulation/progressConstants.js";
import { ProgressUnit, TICKS_PER_BOX } from "@utils/simulation/progressConstants.js";
import type { ITrack } from "@utils/simulation/Track.js";
import { Track } from "@utils/simulation/Track.js";
import _ from "lodash-es";

export interface IProgressTrack extends ITrack {
  rank: ChallengeRank;
  type: ProgressTrackType;
  progressMoveOutcomes: INumericOutcomes;
  recommit(): void;
  erase(times: number): this;
}

export class ProgressTrack extends Track implements IProgressTrack {
  applyResult(data: OutcomeEffectHash): void {
    this.mark(data.markProgress);
  }
  override roll(outcomesData: NumericOutcomes = this.progressMoveOutcomes, challengeDie1?: number, challengeDie2?: number) {
    return super.roll(outcomesData, challengeDie1, challengeDie2);
  }
  private _rank: ChallengeRank;
  public get rank(): ChallengeRank {
    return this._rank;
  }
  public set rank(value: ChallengeRank) {
    this._rank = _.clamp(value, ChallengeRank.Troublesome, ChallengeRank.Epic);
  }
  readonly type: ProgressTrackType;
  constructor({ type, rank, outcomes, ticks = 0 }: { type: ProgressTrackType; rank: ChallengeRank; outcomes: NumericOutcomes; ticks?: number; }) {
    super(ticks);
    this.type = type;
    this._rank = rank;
    this._progressMoveOutcomes = outcomes;
  }
  private _progressMoveOutcomes: NumericOutcomes;
  public get progressMoveOutcomes(): NumericOutcomes {
    return this._progressMoveOutcomes;
  }
  clock?: IClock | undefined;
  /**
   * Returns the number of ticks in a single unit of progress. In other words, this is the number of ticks marked for every "mark progress" on this track.
   */
  get progressUnit() {
    const rankKey = ChallengeRank[this.rank] as keyof typeof ChallengeRank;
    return ProgressUnit[rankKey];
  }
  /**
   * Mark one unit of progress per this track's challenge rank.
   */
  mark(times: number = 1): this {
    this.ticks += (this.progressUnit) * times;
    return this;
  }
  /**
   * Erase one unit of progress per this track's challenge rank.
   */
  erase(times: number = 1): this {
    this.ticks -= (this.progressUnit) * times;
    return this;
  }
  /**
   * The lesser of two challenge
  */
  recommit(): this {
    const challengeDice = [ new Die(10), new Die(10) ];
    const ticksToRemove = (_.min(challengeDice) as Die).valueOf() * TICKS_PER_BOX;
    this.ticks -= ticksToRemove;
    this.rank++;
    return this;
  }
}
