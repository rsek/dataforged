import type { IHasId, IHasText } from "@json_out/index.js";
import type { MoveOutcomesId } from "@json_out/moves/IMoveOutcomes.js";

export type RollOutcomeType = "Miss" | "Weak Hit" | "Strong Hit";

export type RollOutcomeTypeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";

export type MoveOutcomeId = `${MoveOutcomesId}/${RollOutcomeTypeIdFragment}${"" | `/${MatchIdFragment}`}`;

export type MatchIdFragment = "With_a_Match";

export interface IMoveOutcome extends IHasId<MoveOutcomeId>, IHasText {
  "With a Match"?: IMoveOutcome | undefined;
}
