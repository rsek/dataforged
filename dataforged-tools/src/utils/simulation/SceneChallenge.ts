import { ChallengeRank, ClockSegments, MoveOutcome } from "@json_out/index.js";
import { TensionClock } from "@utils/simulation/Clock.js";
import { ActionRoll, MAX_SCORE } from "@utils/simulation/IronswornRoll.js";
import { ProgressTrack, ProgressTrackType } from "@utils/simulation/Track.js";
import _ from "lodash-es";


export class SceneChallenge extends ProgressTrack  {
  clock: TensionClock;
  constructor(rank: ChallengeRank = ChallengeRank.Formidable, ticks: number = 0, filled: number = 0, segments: ClockSegments = ClockSegments.Six) {
    super(ProgressTrackType.SceneChallenge, rank, ticks);
    this.clock = new TensionClock(segments, filled);
  }
  override toString(): string {
    return `${super.toString()} | Clock: ${this.clock.filled}/${this.clock.segments}`;
  }
  simulate({ stat = 2, add = 0, log = false }: { stat?: number; add?: number; log?: boolean; } = {}) {
    if (log) {
      console.log(`Simulating a ${ChallengeRank[this.rank]} scene challenge with a ${this.clock.segments}-segment clock.`);
    }
    const result = {
      actionRolls: 0,
      progress: 0,
      outcome: undefined as unknown as MoveOutcome
    };
    while (this.clock.filled < this.clock.segments && this.score < MAX_SCORE) {
      this.faceDanger(stat, add, log);
      if (log) {
        console.log(this.toString());
      }
      result.actionRolls++;
    }
    result.progress = this.score;
    const roll = this.roll();
    result.outcome = roll.outcome;
    if (log) {
      console.log(roll.toString());
      console.log(`Finished with a ${MoveOutcome[result.outcome]} after ${result.actionRolls} moves.`);
    }
    return result;
  }
  faceDanger(stat: number, add: number=0, log: boolean = false) {
    const roll = new ActionRoll(stat, add);
    const result = {
      add: 0,
      momentum: 0,
      payThePrice: false
    };
    switch (roll.outcome) {
      case MoveOutcome["Strong Hit"]:
        this.mark();
        if (roll.isMatch) {this.mark();}
        break;
      case MoveOutcome["Weak Hit"]:
        this.mark();
        this.clock.filled++;
        break;
      case MoveOutcome["Miss"]:
        this.clock.filled++;
        result.payThePrice = true;
        if (roll.isMatch) {this.clock.filled++;}
        break;
      default:
        break;
    }
    if (log) {
      console.log("Resolving - ",roll.toString());
    }
    return result;
  }
  secureAnAdvantage(stat: number, add: number=0, preferMomentum: boolean = false) {
    const roll = new ActionRoll(stat, add);
    const result = {
      add: 0,
      momentum: 0,
      payThePrice: false
    };
    switch (roll.outcome) {
      case MoveOutcome["Strong Hit"]:
        result.add++;
        result.momentum += 2;
        if (roll.isMatch) {this.mark();}
        break;
      case MoveOutcome["Weak Hit"]:
        if (preferMomentum) {result.momentum += 2;} else {result.add++;}
        break;
      case MoveOutcome["Miss"]:
        this.clock.filled++;
        if (roll.isMatch) {this.clock.filled++;}
        result.payThePrice = true;
        break;
      default:
        break;
    }
    return result;
  }
}