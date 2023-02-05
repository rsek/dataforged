import { type Moves, type Localize } from 'src/types'
import { type Node } from 'src/types/abstract'

// TODO: make these ruleset sensitive

export type AssetID = string

export type AssetType = string

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AssetBase extends Node<AssetID> {
  asset_type: AssetType
  abilities: [AssetAbility, AssetAbility, AssetAbility]
}

export interface AssetStarforged extends AssetBase {
  abilities: [
    AssetAbilityStarforged,
    AssetAbilityStarforged,
    AssetAbilityStarforged
  ]
}
export interface AssetClassic extends AssetBase {
  abilities: [AssetAbilityClassic, AssetAbilityClassic, AssetAbilityClassic]
}

export type Asset = AssetStarforged | AssetClassic

interface AssetAbilityBase {
  name?: Localize.Label
  text: Localize.MarkdownParagraph
  moves?: Record<string, Moves.Move>
}

export interface AssetAbilityStarforged extends AssetAbilityBase {
  moves?: Record<string, Moves.MoveStarforged>
}
export interface AssetAbilityClassic extends AssetAbilityBase {
  moves?: Record<string, Moves.MoveClassic>
}

export type AssetAbility = AssetAbilityStarforged | AssetAbilityClassic

type ConditionMeterAliasCommon = 'companion_health' | 'attached_asset_meter'

export type ConditionMeterAliasStarforged =
  | ConditionMeterAliasCommon
  | 'vehicle_integrity'
  | 'command_vehicle_integrity'
  | 'support_vehicle_integrity'
  | 'incidental_vehicle_integrity'

export type ConditionMeterAliasClassic = ConditionMeterAliasCommon
