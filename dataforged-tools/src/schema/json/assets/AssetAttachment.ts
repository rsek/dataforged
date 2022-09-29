import type { AssetType } from '@schema'

/**
 * Details which assets are valid attachments. The most prominent example in *Ironsworn: Starforged* is the STARSHIP asset (`Starship/Assets/Command_vehicle/Starship`); Rover (`Starship/Assets/Support_vehicle/Rover`) also has an elective ability that adds this property.
 * @public
 */
export interface AssetAttachment {
  /**
   * The type of asset that this asset accepts as attachments.
   */
  'asset_types': Array<AssetType['$id']>
  /**
   * The maximum number of attached assets accepted by this asset. If undefined or null, there is no maximum.
   * @nullable
   */
  'max': number | null
}
