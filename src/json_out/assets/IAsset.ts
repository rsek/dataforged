import type { AssetId, AssetTypeId, FragmentString,IAssetAbility, IAssetAttachment, IAssetInput, IConditionMeter, IHasAliases, IHasDisplay, IHasId, IHasName, IHasSource } from "@json_out/index.js";
import type { Tuple } from "@utils/types/Tuple.js";

export * from "@utils/types/Tuple.js";

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 */
export interface IAsset extends IHasId<AssetId>, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
  /**
   * @example `"Assets/Path/Bounty_Hunter"`
   */
  $id: AssetId;
  /**
   * The asset's name - the title printed on the card.
   * @example "Bounty Hunter"
   */
  Name: string;
  /**
   * The ID of the asset's parent AssetType
   * @example `"Assets/Path"`
   */
  "Asset Type": AssetTypeId;
  /**
   * Details on what attachments (other assets) are accepted by this asset.
   */
  Attachments?: IAssetAttachment | undefined;
  /**
   * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
   */
  Inputs?: IAssetInput[] | undefined;
  /**
   * An optional markdown string representing the requirement text that appears at the top of some asset cards.
   * @example "If you wear your finely crafted set of personal armor..."
   */
  Requirement?: FragmentString | undefined;
  /**
   * The asset's abilities.
   */
  Abilities: Tuple<IAssetAbility, 3>;
  /**
   * Information on this asset's condition meter, if any.
   */
  "Condition Meter"?: IConditionMeter | undefined;

}