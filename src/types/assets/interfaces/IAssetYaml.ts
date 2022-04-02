import type IAssetAbilityYaml from "./IAssetAbilityYaml.js";
import type { IConditionMeter } from "../../general/ConditionMeter.js";
import type IDisplay from "../../general/IDisplay.js";
import type { IInput, Input } from "../../general/Input.js";
import type ISource from "../../general/interfaces/ISource.js";
import type MdString from "../../general/MdString.js";
import type Tuple from "../../general/Tuple.js";
import type IAssetAttachment from "../AssetAttachment.js";
import type AssetId from "../AssetId.js";
import type AssetTypeId from "../AssetTypeId.js";

export default interface IAssetYaml {
  $id?: AssetId | undefined;
  Name: string;
  Source?: ISource;
  Aliases?: string[] | undefined;
  "Asset Type": AssetTypeId;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  Requirement?: MdString | undefined;
  Abilities: Tuple<IAssetAbilityYaml, 3>;
  Display?: IDisplay | undefined;
  "Condition Meter"?: IConditionMeter | undefined;
}
