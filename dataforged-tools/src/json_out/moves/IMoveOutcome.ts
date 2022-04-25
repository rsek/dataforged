import type { IHasId, IHasText } from "@json_out/index.js";
import type { MoveOutcomesId } from "@json_out/moves/IMoveOutcomes.js";
/**
 * @public
 */
export type RollOutcomeType = "Miss" | "Weak Hit" | "Strong Hit";
/**
 * @public
 */
export type RollOutcomeTypeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";
/**
 * @public
 */
export type MoveOutcomeId = `${MoveOutcomesId}/${RollOutcomeTypeIdFragment}${"" | `/${MatchIdFragment}`}`;
/**
 * @public
 */
export type MatchIdFragment = "With_a_Match";
/**
 * @public
 */
export interface IMoveOutcome extends IHasId<MoveOutcomeId>, IHasText {
  /**
   * Defines a different outcome for this result with a match. This *replaces* the parent outcome's effect.
   */
  "With a Match"?: IMoveOutcome | undefined;
  /**
   * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
   */
  "Count as"?: RollOutcomeType | undefined;
}
