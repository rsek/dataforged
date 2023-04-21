import type { MixinId, MixinText } from '@schema'

/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export interface MoveReroll extends MixinId, Partial<MixinText> {
  /**
   *
   */
  $id: string
  /**
   * The markdown string describing the conditions of the reroll. It should be presented to the user so that they can decide whether a reroll is appropriate.
   * @markdown
   * @localize
   */
  text?: string | undefined
  /**
   * The dice to be rerolled.
   */
  dice: RerollType
}

/**
 * Enumerates which dice are to be rerolled.
 * @public
 */
export enum RerollType {
  /**
   * The player can pick and choose which dice to reroll.
   */
  Any = 'any',
  /**
   * The player can pick and choose which challenge dice to reroll (none, one, or both).
   */
  ChallengeDice = 'challenge_dice',
  /**
   * The action die is rerolled.
   */
  ActionDie = 'action_die',
  /**
   * The player can choose **one** challenge die to reroll.
   */
  ChallengeDie = 'challenge_die',
  /**
   * Reroll *all* dice
   */
  All = 'all'
}
