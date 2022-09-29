import type { Asset, MixinDescription, MixinDisplay, MixinSource, MixinTitle, TitleCaseTitle } from '@schema'

/**
 * Represents a Rarity (described in Ironsworn: Delve)
 * @public
 */
export interface DelveRarity extends MixinTitle, MixinDisplay, MixinSource, MixinDescription {
  /**
   * @minimum 3
   * @maximum 5
   */
  'xp_cost': number
  /**
   * The ID of the asset, to which this rarity applies its effects.
   * @see {@link Asset.$id}
   */
  asset: Asset['$id']
  title: TitleCaseTitle
}
