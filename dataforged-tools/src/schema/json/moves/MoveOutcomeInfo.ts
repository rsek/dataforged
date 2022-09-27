import type { HasId, HasText, MoveReroll } from "@schema";
/**
 * @public
 */
export enum MoveOutcome {
  Miss = 0,
  "Weak hit" = 1,
  "Strong hit" = 2
};

/**
 * @public
 */
export interface OutcomeBase<O extends MoveOutcome, RequireText extends boolean = false> extends HasId, Partial<HasText> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/((miss|strong_hit)(/with_a_match)?|weak_hit)$
   */
  $id: string;
  /**
   * Defines a different outcome for this result with a match. Its text should replace the text of this object.
   */
  "With a match"?: OutcomeBase<O> | undefined;
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
  "In control"?: boolean | undefined;
  Text?: RequireText extends true ? string : (string| undefined);
}

/**
 * @public
 */
export interface OutcomeMiss extends HasId, OutcomeBase<MoveOutcome.Miss, true> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/miss$
   */
  $id: string;
  "With a match"?: OutcomeMissMatch | undefined;
  /**
   * @default false
   */
  "In control"?: boolean | undefined;
}
/**
 * @public
 */
export interface OutcomeWeakHit extends Omit<OutcomeBase<typeof MoveOutcome["Weak hit"],true>,"With a match"> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/weak_hit$
   */
  $id: string;
  /**
   * @default false
   */
  "In control"?: boolean | undefined;
}
/**
 * @public
 */
export interface OutcomeStrongHit extends HasId, OutcomeBase<typeof MoveOutcome["Strong hit"],true> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/strong_hit$
   */
  $id: string;
  "With a match"?: OutcomeStrongHitMatch | undefined;
  /**
   * @default true
   */
  "In control"?: boolean | undefined;
}

/**
 * @public
 */
export interface OutcomeStrongHitMatch extends Omit<OutcomeStrongHit, "With a match"> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/strong_hit/with_a_match$
   */
  $id: string;
  /**
   * @default true
   */
  "In control"?: boolean | undefined;
}
/**
 * @public
 */
export interface OutcomeMissMatch extends Omit<OutcomeMiss, "With a match"> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/miss/with_a_match$
   */
  $id: string;
  /**
   * @default false
   */
  "In control"?: boolean | undefined;
}

