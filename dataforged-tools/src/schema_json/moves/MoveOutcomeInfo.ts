import type { HasId, HasText, MoveReroll } from "@schema_json";
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
export interface OutcomeBase<O extends MoveOutcome, RequireText extends boolean = false> extends HasId, Partial<HasText> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/((Miss|Strong_Hit)(/With_a_Match)?|Weak_Hit)$
   */
  $id: string;
  /**
   * Defines a different outcome for this result with a match. Its text should replace the text of this object.
   */
  "With a Match"?: OutcomeBase<O> | undefined;
  /**
   * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
   */
  "Count as"?: keyof typeof MoveOutcome | undefined;
  /**
   * Information on rerolls offered by this move.
   */
  Reroll?: MoveReroll | undefined;
  /**
   * Whether this outcome leaves the player character in control (Starforged) or with initiative (Ironsworn) or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
   */
  "In Control"?: boolean | undefined;
  Text?: RequireText extends true ? string : (string| undefined);
}

/**
 * @public
 */
export interface OutcomeMiss extends HasId, OutcomeBase<MoveOutcome.Miss, true> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Miss$
   */
  $id: string;
  "With a Match"?: OutcomeMissMatch | undefined;
  /**
   * @default false
   */
  "In Control"?: boolean | undefined;
}
/**
 * @public
 */
export interface OutcomeWeakHit extends Omit<OutcomeBase<typeof MoveOutcome["Weak Hit"],true>,"With a Match"> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Weak_Hit$
   */
  $id: string;
  /**
   * @default false
   */
  "In Control"?: boolean | undefined;
}
/**
 * @public
 */
export interface OutcomeStrongHit extends HasId, OutcomeBase<typeof MoveOutcome["Strong Hit"],true> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Strong_Hit$
   */
  $id: string;
  "With a Match"?: OutcomeStrongHitMatch | undefined;
  /**
   * @default true
   */
  "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export interface OutcomeStrongHitMatch extends Omit<OutcomeStrongHit, "With a Match"> {
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
export interface OutcomeMissMatch extends Omit<OutcomeMiss, "With a Match"> {
  /**
   * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Miss/With_a_Match$
   */
  $id: string;
  /**
   * @default false
   */
  "In Control"?: boolean | undefined;
}

