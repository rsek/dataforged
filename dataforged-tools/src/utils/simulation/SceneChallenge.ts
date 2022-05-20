import { ChallengeRank, ClockSegments, MoveOutcome } from "@json_out/index.js";
import { TensionClock } from "@utils/simulation/Clock.js";
import { MAX_SCORE } from "@utils/simulation/IronswornRoll.js";
import { faceDangerNew, SaAnew } from "@utils/simulation/moveData.js";
import type { IOutcomesNumbers, IOutcomeWithNumbers } from "@utils/simulation/OutcomeWithNumbers.js";
import type { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import { ProgressTrack, ProgressTrackType } from "@utils/simulation/Track.js";
import _ from "lodash-es";

export enum MoveSelectionStrategy {
  Simple, // repeatedly use Face Danger
  Alternate, // one SaA followed by one Face Danger
}


export class SceneChallenge extends ProgressTrack  {
  clock: TensionClock;
  constructor(rank: ChallengeRank = ChallengeRank.Formidable, ticks: number = 0, filled: number = 0, segments: ClockSegments = ClockSegments.Six) {
    super(ProgressTrackType.SceneChallenge, rank, ticks);
    this.clock = new TensionClock(segments, filled);
  }
  override toString(): string {
    return `${super.toString()} | Clock: ${this.clock.filled}/${this.clock.segments}`;
  }
  override applyResult(data: IOutcomeWithNumbers) {
    super.applyResult(data);
    this.clock.applyResult(data);
  }
  run({ pc, strategy, FDResultsData, SaAResultsData, statFD: stat = 2, add = 0, log = false }: { pc: PlayerCharacter, strategy: MoveSelectionStrategy, FDResultsData: IOutcomesNumbers, SaAResultsData: IOutcomesNumbers, statFD?: number; statSAA?: number; add?: number; log?: boolean; }) {
    if (log) {
      console.log(`Simulating a ${ChallengeRank[this.rank]} scene challenge with a ${this.clock.segments}-segment clock.`);
    }
    const result = {
      actionRolls: 0,
      progress: 0,
      outcome: undefined as unknown as MoveOutcome
    };
    while (this.clock.filled < this.clock.segments && this.score < MAX_SCORE) {
      switch (strategy) {
        case MoveSelectionStrategy.Simple: {
          pc.evaluateActionRoll({
            resultsData: FDResultsData,
            stat,
            log,
            progressTrack: this,
            name: "Face Danger"
          });
        }
          break;
        case MoveSelectionStrategy.Alternate: {
          const isEven = !!(result.actionRolls % 2 ?? 0);

          pc.evaluateActionRoll({
            resultsData: (isEven ? SaAResultsData : FDResultsData), name: (isEven ? "Secure an Advantage" : "Face Danger"), stat, log, progressTrack: this
          });
        }
          break;
        default:
          throw RangeError();
      }

      if (log) {
        console.log(pc.toString());
        console.log(this.toString());
      }
      result.actionRolls++;
    }
    result.progress = this.score;
    const roll = this.roll();
    result.outcome = roll.outcome;
    if (log) {
      console.log("End the Scene:", roll.toString());
      console.log(`Finished with a ${MoveOutcome[result.outcome]} after ${result.actionRolls} action rolls.`);
    }
    return result;
  }
}

// const pc = new PlayerCharacter();
// const challenge = new SceneChallenge(ChallengeRank.Formidable);
// console.log(challenge.run({
//   pc, FDResultsData: faceDangerNew, SaAResultsData: SaAnew, strategy: MoveSelectionStrategy.Alternate, log:true
// }));