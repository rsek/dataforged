import type { IHasId, IHasText } from "../index.js";
import type { MoveOutcomesId } from "./IMoveOutcomes.js";
export declare type RollOutcomeType = "Miss" | "Weak Hit" | "Strong Hit";
export declare type RollOutcomeTypeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";
export declare type MoveOutcomeId = `${MoveOutcomesId}/${RollOutcomeTypeIdFragment}${"" | `/${MatchIdFragment}`}`;
export declare type MatchIdFragment = "With_a_Match";
export interface IMoveOutcome extends IHasId<MoveOutcomeId>, IHasText {
    "With a Match"?: IMoveOutcome | undefined;
}
//# sourceMappingURL=IMoveOutcome.d.ts.map