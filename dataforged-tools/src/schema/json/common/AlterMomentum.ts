import type { MixinId, MixinText, MoveOutcome } from '@schema'

/**
 * @public
 */
export interface AlterMomentum extends MixinId {
  /**
   * Information on how the player's momentum burn is altered.
   */
  burn?: AlterMomentumBurn[] | undefined
  /**
   * Information on how the player's momentum reset is altered.
   */
  reset?: AlterMomentumReset[] | undefined
}
/**
 * @public
 */
export interface AlterMomentumBurn extends MixinId {
  /**
   * The trigger condition for altering the PC's momentum burn.
   */
  trigger: MixinText
  /**
   * The effect altering the PC's momentum burn.
   */
  effect: MixinText
  outcomes?: Array<typeof MoveOutcome[1] | typeof MoveOutcome[2]> | undefined
}
/**
 * @public
 */
export interface AlterMomentumReset extends MixinId {
  /**
   * The trigger condition for altering the PC's momentum reset.
   */
  trigger: MixinText
  /**
   * The amount by which the PC's momentum reset is change.
   */
  value: number
}
