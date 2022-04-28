import type { IHasId, IHasText } from "@json_out/index.js";
import type { MoveOutcomesId } from "@json_out/moves/IMoveOutcomes.js";
import type { IMoveReroll } from "@json_out/moves/IMoveReroll.js";
/**
 * @public
 */
export enum MoveOutcome {Miss="Miss", Weak_Hit = "Weak Hit", Strong_Hit = "Strong Hit"};
/**
 * @public
 */
export type MoveOutcomeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";
/**
 * @public
 */
export type MoveOutcomeId = `${MoveOutcomesId}/${MoveOutcomeIdFragment}${"" | `/${MatchIdFragment}`}`;
/**
 * @public
 */
export type MatchIdFragment = "With_a_Match";
/**
 * @public
 */
export interface IOutcomeInfo extends IHasId<MoveOutcomeId>, IHasText {
  /**
   * Defines a different outcome for this result with a match. Its text should replace the text of this object.
   */
  "With a Match"?: IOutcomeInfo | undefined;
  /**
   * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
   */
  "Count as"?: MoveOutcome | undefined;
  /**
   * Information on rerolls offered by this move.
   */
  Reroll?: IMoveReroll | undefined;
}



