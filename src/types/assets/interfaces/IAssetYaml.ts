import type IAssetAbilityYaml from "./IAssetAbilityYaml.js";
import type { IConditionMeter } from "../../general/ConditionMeter.js";
import type { IInput, Input } from "../../general/Input.js";
import type ISource from "../../general/interfaces/ISource.js";
import type MdString from "../../general/MdString.js";
import type IAssetAttachment from "../AssetAttachment.js";
import type AssetId from "../AssetId.js";
import type AssetType from "../AssetType.js";

export default interface IAssetYaml {
  $id?: AssetId | undefined;
  Name: string;
  Source?: ISource;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  Requirement?: MdString | undefined;
  Abilities: IAssetAbilityYaml[];
  "Condition Meter"?: IConditionMeter | undefined;
}
