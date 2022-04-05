import type IAssetAbility from "./IAssetAbility.js";
import type { IConditionMeter } from "../../general/ConditionMeter.js";
import type IDisplay from "../../general/IDisplay.js";
import type { IInput } from "../../general/Input.js";
import type ISource from "../../general/interfaces/ISource.js";
import type IRules from "../../general/IRules.js";
import type { FragmentString } from "../../general/StringTypes.js";
import type Tuple from "../../general/Tuple.js";
import type IAssetAttachment from "../AssetAttachment.js";
import type AssetId from "../AssetId.js";
import type AssetTypeId from "../AssetTypeId.js";

/**
 * An interface representing a Starforged assets.
 * @date 4/4/2022 - 10:17:07 PM
 *
 * @export
 * @interface IAsset
 * @typedef {IAsset}
 */
export default interface IAsset extends IRules {
  /**
   * @date 4/4/2022 - 10:17:07 PM
   * @example "Assets / Path / Armored"
   * @type {AssetId}
   */
  $id: AssetId;
  /**
   * The asset's name (generally the title printed on the card).
   * @date 4/4/2022 - 10:17:07 PM
   * @example "Armored"
   * @type {string}
   */
  Name: string;

  Aliases?: string[] | undefined;
  /**
   * The ID of the asset's parent AssetType
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {AssetTypeId}
   */
  "Asset Type": AssetTypeId;
  /**
   * Information on which assets can be attached to this asset.
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {?(IAssetAttachment | undefined)}
   */
  Attachments?: IAssetAttachment | undefined;
  /**
   * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
   * @date 4/4/2022 - 10:17:07 PM
   * @type {?(IInput[] | undefined)}
   */
  Inputs?: IInput[] | undefined;
  /**
   * An optional markdown string representing the requirement text that appears at the top of some asset cards.
   * @date 4/4/2022 - 10:17:07 PM
   * @example "If you wear your finely crafted set of personal armor..."
   * @type {?(FragmentString | undefined)}
   */
  Requirement?: FragmentString | undefined;
  /**
   * The asset's abilities.
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {Tuple<IAssetAbility, 3>}
   */
  Abilities: Tuple<IAssetAbility, 3>;
  /**
   * Information on this asset's condition meter, if any.
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {?(IConditionMeter | undefined)}
   */
  "Condition Meter"?: IConditionMeter | undefined;
  /**
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {ISource}
   */
  Source: ISource;
  /**
   * @date 4/4/2022 - 10:17:07 PM
   *
   * @type {?(IDisplay | undefined)}
   */
  Display?: IDisplay | undefined;
}
