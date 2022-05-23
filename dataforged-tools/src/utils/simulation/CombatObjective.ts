import type { ChallengeRank } from "@json_out/index.js";
import type { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import { ProgressTrack , ProgressTrackType } from "@utils/simulation/Track.js";

export interface ICombat {
  objectives: CombatObjective[];
  players: PlayerCharacter[];
}

export class CombatObjective extends ProgressTrack {
  // assigned by parent
  readonly type!: ProgressTrackType.Combat;
  constructor(rank: ChallengeRank, ticks: number=0) {
    super(ProgressTrackType.Combat,rank, ticks);
  }
}