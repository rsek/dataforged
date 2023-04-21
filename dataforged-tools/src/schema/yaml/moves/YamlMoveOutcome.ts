import type { MoveOutcome, MoveReroll, OutcomeBase, OutcomeMiss, OutcomeMissMatch, Outcomes, OutcomeStrongHit, OutcomeStrongHitMatch, OutcomeWeakHit, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlOutcomes extends YamlStub<Outcomes, '', keyof typeof MoveOutcome> {
  'strong_hit': YamlOutcomeStrongHit
  'weak_hit': YamlOutcomeWeakHit
  'miss': YamlOutcomeMiss
}

/**
 * @internal
 */
export interface YamlOutcome<O extends MoveOutcome> extends YamlStub<OutcomeBase<O>, '', 'with_a_match' | 'reroll'> {
  'with_a_match'?: YamlOutcome<O> | undefined
  reroll?: YamlMoveReroll | undefined

}

/**
 * @internal
 */
export interface YamlMoveReroll extends YamlStub<MoveReroll> { }

/**
 * @internal
 */
export interface YamlOutcomeMiss extends YamlOutcome<0>, YamlStub<OutcomeMiss, '', 'with_a_match' | 'reroll'> {
  'with_a_match'?: YamlOutcomeMissMatch | undefined
}
/**
 * @internal
 */
export interface YamlOutcomeMissMatch extends YamlOutcome<0>, YamlStub<OutcomeMissMatch, '', 'reroll'> { }

/**
 * @internal
 */
export interface YamlOutcomeStrongHit extends YamlOutcome<2>, YamlStub<OutcomeStrongHit, '', 'with_a_match' | 'reroll'> {
  'with_a_match'?: YamlOutcomeStrongHitMatch | undefined
}
/**
 * @internal
 */
export interface YamlOutcomeStrongHitMatch extends YamlOutcome<2>, YamlStub<OutcomeStrongHitMatch, '', 'reroll'> { }

/**
 * @internal
 */
export interface YamlOutcomeWeakHit extends YamlOutcome<1>, YamlStub<OutcomeWeakHit, '', 'reroll'> {
}
