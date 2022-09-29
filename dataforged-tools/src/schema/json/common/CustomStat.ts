import type { CustomStatOption, MixinId, MixinLabel } from '@schema'

/**
 * @public
 */
export interface CustomStat extends MixinId, MixinLabel {
  /**
   * @pattern ^(starforged|ironsworn)/moves/([a-z_]+|assets/[a-z_]+/[a-z_]+/[0-9]+)/[a-z_]+/trigger/options/[0-9]+/custom_stat$
 */
  $id: string
  options: CustomStatOption[]
}
