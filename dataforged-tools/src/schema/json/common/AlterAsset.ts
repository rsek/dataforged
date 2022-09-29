import type { Asset, AssetAbility, AssetAttachment, ConditionMeter, MixinId, InputToggle, OmitMetadataDeep } from '@schema'
import type { PartialDeep } from '@utils'

/**
 * Describes changes that an asset ability makes to its parent asset when active. Any properties with object values should be merged recursively.
 *
 * @example An `AssetAlterProperties` that would set `Asset["Condition meter"].Max` to 3, and leave its other properties unchanged:
 * ```json
 * { "Condition meter": { "Max": 3 } }
 * ```
 * @public
 */
export interface AlterAsset extends Omit<PartialDeep<OmitMetadataDeep<Asset>>, 'abilities' | 'asset_type' |
  'attachments' | 'condition_meter' | '$id'>, MixinId {
  // TODO: some way of handling stuff that applies to a whole-ass category, like Ritualist and Owl
  /**
   * @pattern ^(starforged|ironsworn)/assets/[a-z_]+/[a-z_]+/[1-3]/alter/assets/[1-9][0-9]*$
   */
  $id: string
  abilities?: AlterAssetAbility[] | undefined
  attachments?: AlterAssetAttachment | undefined
  'condition_meter'?: AlterAssetConditionMeter | undefined
  states?: InputToggle[] | undefined
}
/**
 * @public
 */
export interface AlterAssetAttachment extends Partial<AssetAttachment> { }
/**
 * @public
 */
export interface AlterAssetAbility extends Partial<AssetAbility> { }
/**
 * @public
 */
export interface AlterAssetConditionMeter extends Partial<ConditionMeter> { }
