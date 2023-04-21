import type { IHasId, IHasText , IMoveReroll } from "@json_out/index.js";
/**
 * @public
 */
export enum MoveOutcome {
  Miss = 0,
  "Weak Hit" = 1,
  "Strong Hit" = 2
};

/**
 * @public
 */
export interface IOutcomeInfo extends IHasId, IHasText {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/((Miss|Strong_Hit)(/With_a_Match)?|Weak_Hit)$
   */
  $id: string;
  /**
   * Defines a different outcome for this result with a match. Its text should replace the text of this object.
   */
  "With a Match"?: IOutcomeInfo | undefined;
  /**
   * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
   */
  "Count as"?: keyof typeof MoveOutcome | undefined;
  /**
   * Information on rerolls offered by this move.
   */
  Reroll?: IMoveReroll | undefined;
  /**
   * Whether this outcome leaves the player character in control or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
   */
  "In Control"?: boolean | undefined;
}



