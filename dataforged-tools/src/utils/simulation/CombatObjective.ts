import type { ChallengeRank } from "@json_out/index.js";
import type { NumericOutcomes } from "@utils/simulation/NumericOutcomes.js";
import type { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import { ProgressTrackType } from "@utils/simulation/progressConstants.js";
import { ProgressTrack } from "@utils/simulation/ProgressTrack.js";

export interface ICombat {
  objectives: CombatObjective[];
  players: PlayerCharacter[];
}

export class CombatObjective extends ProgressTrack {
  // assigned by parent
  readonly type!: ProgressTrackType.Combat;
  constructor(rank: ChallengeRank, ticks: number=0, outcomes: NumericOutcomes) {
    super({
      type: ProgressTrackType.Combat, rank, outcomes, ticks
    });
  }
}