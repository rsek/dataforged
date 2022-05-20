import { ChallengeRank } from "@json_out/index.js";
import type { IClock } from "@utils/simulation/Clock.js";
import { Die } from "@utils/simulation/Die.js";
import { ProgressRoll } from "@utils/simulation/IronswornRoll.js";
import type { IOutcomesNumbers, IOutcomeWithNumbers } from "@utils/simulation/OutcomeWithNumbers.js";
import _ from "lodash-es";


/**
 * The number of progress boxes in a track.
 */
export const BOXES_PER_TRACK = 10;
/**
 * The number of ticks in a progress box.
 */
export const TICKS_PER_BOX = 4;

export enum ProgressTrackType {
  Vow,
  Connection,
  Expedition,
  Combat,
  SceneChallenge
}

export enum ProgressChars {
  "🌑" = 0,
  "🌒" = 1,
  "🌓" = 2,
  "🌔" = 3,
  "🌕" = 4
}

/**
 * Render a track as an ascii progress bar.
 * @param track The track to be rendered
 */
function renderProgress(track: ITrack) {
  let bar = _.repeat(ProgressChars[TICKS_PER_BOX], track.score);
  if (track.score < 10){
    bar += ProgressChars[track.ticks % TICKS_PER_BOX];
  }
  bar = _.padEnd(bar, BOXES_PER_TRACK,ProgressChars[0]);
  return bar;
}


export interface ITrack {
  ticks: number;
  score: number;
  clock?: IClock | undefined;
  applyResult(data: IOutcomeWithNumbers): void;
}

export interface IProgressTrack extends ITrack {
  rank: ChallengeRank;
}
/**
 * Enumerates the number of ticks in one unit of progress for a progress track of a given challenge rank.
 */
export enum ProgressUnit {
  Troublesome = 12,
  Dangerous = 8,
  Formidable = 4,
  Extreme = 2,
  Epic = 1
}


export abstract class Track implements ITrack {
  abstract applyResult(data: IOutcomeWithNumbers): void;
  toString() {
    return `${renderProgress(this)} ${this.score}/${BOXES_PER_TRACK}`;
  }
  get score(): number {
    return Math.floor(this.ticks / TICKS_PER_BOX);
  }
  private _ticks: number;
  public get ticks(): number {
    return this._ticks;
  }
  public set ticks(value: number) {
    this._ticks = _.clamp(value, 0, TICKS_PER_BOX * BOXES_PER_TRACK);
  }
  roll(resultsData?: IOutcomesNumbers,challengeDie1?: number, challengeDie2?: number) {
    return new ProgressRoll({
      score: this.score, challengeDie1, challengeDie2, resultsData
    });
  }
  constructor(ticks: number = 0) {
    this._ticks = ticks;
  }
}

export class ProgressTrack extends Track implements IProgressTrack {
  applyResult(data: IOutcomeWithNumbers): void {
    this.mark(data.markProgress);
  }
  private _rank: ChallengeRank;
  public get rank(): ChallengeRank {
    return this._rank;
  }
  public set rank(value: ChallengeRank) {
    this._rank = _.clamp(value, ChallengeRank.Troublesome, ChallengeRank.Epic);
  }
  readonly type: ProgressTrackType;
  constructor(type: ProgressTrackType, rank: ChallengeRank, ticks: number = 0) {
    super(ticks);
    this.type = type;
    this._rank = rank;
  }
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
    this.ticks += (this.progressUnit)*times;
    return this;
  }
  /**
   * Erase one unit of progress per this track's challenge rank.
   */
  erase(times: number = 1): this {
    this.ticks -= (this.progressUnit)*times;
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

