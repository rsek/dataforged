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
export interface IOutcomeInfoBase<O extends MoveOutcome> extends IHasId, IHasText {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/((Miss|Strong_Hit)(/With_a_Match)?|Weak_Hit)$
   */
  $id: string;
  /**
   * Defines a different outcome for this result with a match. Its text should replace the text of this object.
   */
  "With a Match"?: IOutcomeInfoBase<O> | undefined;
  /**
   * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
   */
  "Count as"?: keyof typeof MoveOutcome | undefined;
  /**
   * Information on rerolls offered by this move.
   */
  Reroll?: IMoveReroll | undefined;
  /**
   * Whether this outcome leaves the player character in control (Starforged) or with initiative (Ironsworn) or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
   */
  "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export interface IOutcomeMiss extends IOutcomeInfoBase<MoveOutcome.Miss> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Miss$
   */
  $id: string;
  "With a Match"?: IOutcomeMissMatch | undefined;
  /**
   * @default false
   */
  "In Control"?: boolean | undefined;
}
/**
 * @public
 */
export interface IOutcomeWeakHit extends IOutcomeInfoBase<typeof MoveOutcome["Weak Hit"]> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Weak_Hit$
   */
  $id: string;
  "With a Match"?: undefined;
  /**
   * @default false
   */
  "In Control"?: boolean | undefined;
}
/**
 * @public
 */
export interface IOutcomeStrongHit extends IOutcomeInfoBase<typeof MoveOutcome["Strong Hit"]> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Strong_Hit$
   */
  $id: string;
  "With a Match"?: IOutcomeStrongHitMatch | undefined;
  /**
   * @default true
   */
  "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export interface IOutcomeStrongHitMatch extends Omit<IOutcomeStrongHit, "With a Match"> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Strong_Hit/With_a_Match$
   */
  $id: string;
  /**
   * @default true
   */
  "In Control"?: boolean | undefined;
}
/**
 * @public
 */
export interface IOutcomeMissMatch extends Omit<IOutcomeMiss, "With a Match"> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Miss/With_a_Match$
   */
  $id: string;
  /**
   * @default false
   */
  "In Control"?: boolean | undefined;
}

