import type { IHasId, MoveId } from "@json_out/index.js";
import type { IOutcomeInfo, MoveOutcome } from "@json_out/moves/IMoveOutcomeInfo.js";

/**
 * @internal
 * @asType string
 */
export type MoveOutcomesId = `${MoveId}/Outcomes`;
/**
 * @public
 */
export interface IMoveOutcomes extends IHasId {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes$
   */
  $id: string;
  [MoveOutcome.Strong_Hit]: IOutcomeInfo;
  [MoveOutcome.Weak_Hit]: IOutcomeInfo;
  [MoveOutcome.Miss]: IOutcomeInfo;
}
