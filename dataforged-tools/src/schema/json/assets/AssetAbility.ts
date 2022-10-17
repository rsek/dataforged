import type { InputClock, InputNumber, InputSelect, InputText, InputToggle, MixinAlter, MixinId, MixinLabel, MixinText, Move } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export interface AssetAbility extends MixinId, MixinText, Partial<MixinLabel> {
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_]+/[a-z_]+/[1-3]$
   */
  $id: string
  /**
   * Ironsworn companion assets provide labels for their abilities. Starforged asset abilities do not have labels.
   */
  label?: string | undefined
  /**
   * New moves added by this asset ability.
   */
  moves?: Move[] | undefined
  /**
   * User inputs (text, clocks, etc) associated with this asset ability.
   */
  inputs?: { [key: SnakeCaseString]: (InputText | InputNumber | InputToggle | InputClock | InputSelect) } | undefined
  /**
   * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
   */
  enabled: boolean
  alter?: MixinAlter | undefined
}
