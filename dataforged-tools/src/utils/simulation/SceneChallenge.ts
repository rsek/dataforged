import type { ClockSegments } from "@json_out";
import { ChallengeRank, MoveOutcome } from "@json_out";
import { TensionClock } from "@utils/simulation/Clock.js";
import { MAX_SCORE } from "@utils/simulation/IronswornRoll.js";
import { FD_may20, finishTheScene, SaA_may20 } from "@utils/simulation/moveData.js";
import { OutcomeEffectType } from "@utils/simulation/NumericOutcomes.js";
import type {  NumericOutcomes, OutcomeEffectHash } from "@utils/simulation/NumericOutcomes.js";
import { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import { ProgressTrackType } from "@utils/simulation/progressConstants.js";
import { ProgressStrategy } from "@utils/simulation/ProgressStrategy.js";
import { ProgressTrack } from "@utils/simulation/ProgressTrack.js";
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
  constructor(rank: ChallengeRank, segments: ClockSegments, outcomes: NumericOutcomes=finishTheScene, ticks: number = 0, segmentsFilled: number = 0) {
    super({
      type: ProgressTrackType.SceneChallenge,
      rank,
      ticks,
      outcomes
    });
    this.clock = new TensionClock(segments, segmentsFilled);
  }
  override toString(): string {
    return `${super.toString()} | Clock: ${this.clock.filled}/${this.clock.segments}`;
  }
  override applyResult(data: OutcomeEffectHash) {
    super.applyResult(data);
    this.clock.applyResult(data);
  }
  run({ pc, FDResultsData, SaAResultsData, statFD = 2, statSaA=3, add = 0, log = false }: { pc: PlayerCharacter, FDResultsData: NumericOutcomes, SaAResultsData: NumericOutcomes, statFD?: number; statSaA?: number; add?: number; log?: boolean; }) {
    if (log) {
      console.log(`Simulating a ${ChallengeRank[this.rank]} scene challenge with a ${this.clock.segments}-segment clock.`);
      console.log(pc.toString());
    }
    const result = {
      actionRolls: 0,
      progress: 0,
      outcome: undefined as unknown as MoveOutcome
    };
    while (this.clock.filled < this.clock.segments && this.score < MAX_SCORE) {
      let mvParams: Parameters<typeof pc.evaluateActionRoll>[0];
      const mvParamsFD: Parameters<typeof pc.evaluateActionRoll>[0] = {
        outcomesData: FDResultsData,
        stat: statFD,
        log,
        progressTrack: this,
        name: "Face Danger"
      };
      const mvParamsSaA: Parameters<typeof pc.evaluateActionRoll>[0] = {
        outcomesData: SaAResultsData,
        stat: statSaA,
        log,
        progressTrack: this,
        name: "Secure an Advantage"
      };
      switch (pc.strategy) {
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
      console.log("Finish the Scene:", roll.toString());
      console.log(`Finished with a ${MoveOutcome[result.outcome]} after ${result.actionRolls} action rolls.`);
    }
    return result;
  }
}

const sc = new SceneChallenge(ChallengeRank.Dangerous,4);
const pc = new PlayerCharacter({ strategy: ProgressStrategy.Progress });
sc.run({
  pc, FDResultsData: FD_may20, SaAResultsData: SaA_may20, log: true
});