import type IAssetAbility from "@dataforged/interfaces/json_out/assets/IAssetAbility.js";
import type IAssetAttachment from "@dataforged/interfaces/json_out/assets/IAssetAttachment.js";
import type { IAssetInput } from "@dataforged/interfaces/json_out/assets/IAssetInput.js";
import type IConditionMeter from "@dataforged/interfaces/json_out/common/IConditionMeter.js";
import type { IHasAliases, IHasDisplay, IHasId, IHasName, IHasSource } from "@dataforged/interfaces/json_out/common/IHas.js";
import type AssetId from "@dataforged/strings/id/AssetId.js";
import type AssetTypeId from "@dataforged/strings/id/AssetTypeId.js";
import type { FragmentString } from "@dataforged/strings/MdString.js";
import type Tuple from "@dataforged/utils/types/Tuple.js";

/**
 * An interface representing a Starforged assets.
 *
 */
export default interface IAsset extends IHasId<AssetId>, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
  /**
   * @example "Assets / Path / Armored"
   */
  $id: AssetId;
  /**
   * The asset's name (generally the title printed on the card).
   * @example "Armored"
   */
  Name: string;

  /**
   * The ID of the asset's parent AssetType
   */
  "Asset Type": AssetTypeId;
  /**
   * Information on which assets can be attached to this asset.
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
