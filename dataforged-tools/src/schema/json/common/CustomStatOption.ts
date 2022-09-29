import type { MixinId, MixinLabel } from '@schema'

/**
 * @public
 */
export interface CustomStatOption extends MixinId, MixinLabel {
  /**
   * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat/[a-z_-]+$
   */
  $id: string
  /**
   * The numeric value to be used as +stat when making an Action Roll.
   */
  value: number
  label: string
}
