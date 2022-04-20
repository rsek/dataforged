import type { IHasId, IHasText } from "../index.js";
import type { MoveOutcomesId } from "./IMoveOutcomes.js";
/**
 * @public
 */
export declare type RollOutcomeType = "Miss" | "Weak Hit" | "Strong Hit";
/**
 * @public
 */
export declare type RollOutcomeTypeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";
/**
 * @public
 */
export declare type MoveOutcomeId = `${MoveOutcomesId}/${RollOutcomeTypeIdFragment}${"" | `/${MatchIdFragment}`}`;
/**
 * @public
 */
export declare type MatchIdFragment = "With_a_Match";
/**
 * @public
 */
export interface IMoveOutcome extends IHasId<MoveOutcomeId>, IHasText {
    "With a Match"?: IMoveOutcome | undefined;
}
//# sourceMappingURL=IMoveOutcome.d.ts.map