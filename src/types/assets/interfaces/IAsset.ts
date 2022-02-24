import { ConditionMeter, IConditionMeter } from "../../general/ConditionMeter";
import { IInput, Input } from "../../general/Input";
import ISource from "../../general/interfaces/ISource";
import Source from "../../general/Source";
import AssetAbility from "../AssetAbility";
import IAssetAttachment from "../AssetAttachment";
import AssetId from "../AssetId";
import AssetType from "../AssetType";
import IAssetAbility from "./IAssetAbility";

// interface for outgoing json + dezerialization

export default interface IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | undefined;
  Requirement?: string | undefined;
  Abilities: IAssetAbility[];
  "Condition Meter"?: IConditionMeter | undefined;
  Source: ISource;
}
