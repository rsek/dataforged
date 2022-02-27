import { IConditionMeter } from "../../general/ConditionMeter";
import { IInput, Input } from "../../general/Input";
import ISource from "../../general/interfaces/ISource";
import MdString from "../../general/MdString";
import IAssetAttachment from "../AssetAttachment";
import AssetId from "../AssetId";
import AssetType from "../AssetType";
import IAssetAbilityYaml from "./IAssetAbilityYaml";

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
