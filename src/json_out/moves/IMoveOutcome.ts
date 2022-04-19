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
  "With a Match"?: IMoveOutcome | undefined;
}
