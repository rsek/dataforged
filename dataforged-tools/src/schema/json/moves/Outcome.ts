import type { MixinId, MixinText, MoveReroll } from '@schema'
/**
 * @public
 */
export enum MoveOutcome {
  miss = 0,
  weak_hit = 1,
  strong_hit = 2
};

/**
 * @public
 */
export interface OutcomeBase<O extends MoveOutcome, RequireText extends boolean = false> extends MixinId, Partial<MixinText> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/((miss|strong_hit)(/with_a_match)?|weak_hit)$
   */
  $id: string
  /**
   * Defines a different outcome for this result with_a_match. Its text should replace the text of this object.
   */
  with_a_match?: OutcomeBase<O> | undefined
  /**
   * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
   */
  count_as?: keyof typeof MoveOutcome | undefined
  /**
   * Information on rerolls offered by this move.
   */
  reroll?: MoveReroll | undefined
  /**
   * Whether this outcome leaves the player character in control (Starforged) or with initiative (Ironsworn) or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
   */
  in_control?: boolean | undefined
  text?: RequireText extends true ? string : (string | undefined)
}

/**
 * @public
 */
export interface OutcomeMiss extends MixinId, OutcomeBase<MoveOutcome.miss, true> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/miss$
   */
  $id: string
  with_a_match?: OutcomeMissMatch | undefined
  /**
   * @default false
   */
  in_control?: boolean | undefined
}
/**
 * @public
 */
export interface OutcomeWeakHit extends Omit<OutcomeBase<typeof MoveOutcome['weak_hit'], true>, 'with_a_match'> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/weak_hit$
   */
  $id: string
  /**
   * @default false
   */
  in_control?: boolean | undefined
}
/**
 * @public
 */
export interface OutcomeStrongHit extends MixinId, OutcomeBase<typeof MoveOutcome['strong_hit'], true> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/strong_hit$
   */
  $id: string
  with_a_match?: OutcomeStrongHitMatch | undefined
  /**
   * @default true
   */
  in_control?: boolean | undefined
}

/**
 * @public
 */
export interface OutcomeStrongHitMatch extends Omit<OutcomeStrongHit, 'with_a_match'> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/strong_hit/with_a_match$
   */
  $id: string
  /**
   * @default true
   */
  in_control?: boolean | undefined
}
/**
 * @public
 */
export interface OutcomeMissMatch extends Omit<OutcomeMiss, 'with_a_match'> {
  /**
   * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/miss/with_a_match$
   */
  $id: string
  /**
   * @default false
   */
  in_control?: boolean | undefined
}
