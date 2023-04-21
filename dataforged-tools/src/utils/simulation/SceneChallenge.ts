import { ChallengeRank, ClockSegments, MoveOutcome } from "@json_out/index.js";
import { TensionClock } from "@utils/simulation/Clock.js";
import { MAX_SCORE } from "@utils/simulation/IronswornRoll.js";
import { OutcomeEffectType } from "@utils/simulation/NumericOutcomes.js";
import type { NumericOutcome , NumericOutcomes } from "@utils/simulation/NumericOutcomes.js";
import type { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import { ProgressStrategy } from "@utils/simulation/ProgressStrategy.js";
import { ProgressTrack, ProgressTrackType } from "@utils/simulation/Track.js";
import _ from "lodash-es";

export const sceneChallengePriorities: Record<ProgressStrategy, OutcomeEffectType[]> = {
  [ProgressStrategy.Progress]: [
    OutcomeEffectType.markProgress,
    OutcomeEffectType.momentum,
    OutcomeEffectType.add,
  ],
  [ProgressStrategy.Adds]: [
    OutcomeEffectType.markProgress,
    OutcomeEffectType.add,
    OutcomeEffectType.momentum
  ],
  [ProgressStrategy.Momentum]: [
    OutcomeEffectType.markProgress,
    OutcomeEffectType.momentum,
    OutcomeEffectType.add,
  ]
};

export class SceneChallenge extends ProgressTrack  {
  // assigned by parent
  readonly type!: ProgressTrackType.SceneChallenge;
  clock: TensionClock;
  constructor(rank: ChallengeRank = ChallengeRank.Formidable, ticks: number = 0, segmentsFilled: number = 0, segments: ClockSegments = ClockSegments.Six) {
    super(ProgressTrackType.SceneChallenge, rank, ticks);
    this.clock = new TensionClock(segments, segmentsFilled);
  }
  override toString(): string {
    return `${super.toString()} | Clock: ${this.clock.filled}/${this.clock.segments}`;
  }
  override applyResult(data: NumericOutcome<MoveOutcome>) {
    super.applyResult(data);
    this.clock.applyResult(data);
  }
  run({ pc, strategy, FDResultsData, SaAResultsData, statFD = 2, statSaA=3, add = 0, log = false }: { pc: PlayerCharacter, strategy: ProgressStrategy, FDResultsData: NumericOutcomes, SaAResultsData: NumericOutcomes, statFD?: number; statSaA?: number; add?: number; log?: boolean; }) {
    if (log) {
      console.log(`Simulating a ${ChallengeRank[this.rank]} scene challenge with a ${this.clock.segments}-segment clock.`);
    }
    const result = {
      actionRolls: 0,
      progress: 0,
      outcome: undefined as unknown as MoveOutcome
    };
    while (this.clock.filled < this.clock.segments && this.score < MAX_SCORE) {
      let mvParams: Parameters<typeof pc.evaluateActionRoll>[0];
      const mvParamsFD: Parameters<typeof pc.evaluateActionRoll>[0] = {
        resultsData: FDResultsData,
        stat: statFD,
        log,
        progressTrack: this,
        name: "Face Danger"
      };
      const mvParamsSaA: Parameters<typeof pc.evaluateActionRoll>[0] = {
        resultsData: SaAResultsData,
        stat: statSaA,
        log,
        progressTrack: this,
        name: "Secure an Advantage"
      };
      switch (strategy) {
        case ProgressStrategy.Progress: {
          mvParams = mvParamsFD;
        }
          break;
        case ProgressStrategy.Adds: {
          const isEven = !!(result.actionRolls % 2 ?? 0);
          mvParams = (isEven ? mvParamsSaA : mvParamsFD);
        }
          break;
        case ProgressStrategy.Momentum: {
          mvParams = (pc.momentum < pc.momentumMax-2) ? mvParamsSaA : mvParamsFD;
        }
          break;
        default:
          throw RangeError();
      }

      pc.evaluateActionRoll(mvParams);
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