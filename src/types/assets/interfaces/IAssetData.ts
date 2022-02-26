import { IConditionMeter } from "../../general/ConditionMeter";
import { IInput, Input } from "../../general/Input";
import MdString from "../../general/MdString";
import ISource from "../../general/interfaces/ISource";
import IAssetAttachment from "../AssetAttachment";
import AssetId from "../AssetId";
import AssetType from "../AssetType";
import IAssetAbilityData from "./IAssetAbilityData";

export default interface IAssetData {
  $id?: AssetId | undefined;
  Name: string;
  Source?: ISource;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  Requirement?: MdString | undefined;
  Abilities: IAssetAbilityData[];
  "Condition Meter"?: IConditionMeter | undefined;
}
