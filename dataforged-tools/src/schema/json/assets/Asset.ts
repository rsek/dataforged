import type { AssetAbility, AssetAttachment, InputToggle, AssetType, AssetUsage, ConditionMeter, Display, MixinAliases, MixinDisplay, MixinId, MixinSource, MixinTitle, InputClock, InputNumber, InputSelect, InputText, TitleCaseTitle } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @public
 */
export enum AssetTag {
  AnimalCompanion = 'animal_companion',
  BeastCompanion = 'beast_companion',
  IronlanderCompanion = 'ironlander_companion',
  Deed = 'deed',
  BiologicalCompanion = 'biological_companion',
  MechanicalCompanion = 'mechanical_companion'
}

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export interface Asset extends MixinId, MixinDisplay, MixinSource, Partial<MixinAliases>, MixinTitle {
  /**
   * @example "starforged/assets/path/bounty_hunter"
   * @pattern ^(starforged|ironsworn)/assets/[a-z_]+/[a-z_]+$
   */
  $id: string
  title: TitleCaseTitle
  display: Display
  /**
   * {@inheritDoc AssetType.$id}
   */
  asset_type: AssetType['$id']
  /**
   * Information on the asset's usage, such as whether its abilities are shared amongst the player characters.
   */
  usage: AssetUsage
  /**
   * Details on what attachments (other assets) are accepted by this asset.
   */
  attachments?: AssetAttachment | undefined
  /**
   * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
   */
  inputs?: { [key: SnakeCaseString]: (InputNumber | InputClock | InputText | InputSelect | InputToggle) } | undefined
  /**
   * An optional markdown string representing the requirement text that appears at the top of some asset cards.
   * @markdown
   * @localize
   * @example "If you wear your finely crafted set of personal armor..."
   */
  requirement?: string | undefined
  /**
   * The asset's abilities.
   */
  abilities: [AssetAbility, AssetAbility, AssetAbility]
  /**
   * Information on this asset's condition meter, if any.
   */
  'condition_meter'?: ConditionMeter | undefined
  tags?: AssetTag[] | undefined
}
