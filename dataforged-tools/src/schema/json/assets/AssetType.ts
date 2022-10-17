import type { Asset, AssetUsage, Display, MixinAliases, MixinDescription, MixinDisplay, MixinId, MixinSource, MixinTitle, Title } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'

export * from '@utils/types/RequireKey.js'

/**
 * @public
 */
export enum AssetTypeName {
  CommandVehicle = 'Command vehicle',
  Companion = 'Companion',
  Deed = 'Deed',
  Module = 'Module',
  Path = 'Path',
  SupportVehicle = 'Support vehicle',
  Ritual = 'Ritual',
  CombatTalent = 'Combat talent'
}

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export interface AssetType extends MixinId, MixinDescription, MixinDisplay, MixinSource, MixinTitle, Partial<MixinAliases> {
  /**
   * @example "ironsworn/assets/ritual"
   * @example "starforged/assets/command_vehicle"
   * @pattern ^(starforged|ironsworn)/assets/[a-z_]+$
   */
  $id: string
  /**
   * The assets that belong to this asset type.
   */
  assets: { [key: SnakeCaseString]: Asset }

  /**
   * @example "Ritual"
   * @example "Command vehicle"
   * @localize
   */
  title: Title
  display: Display
  usage: AssetUsage
}
