import { ConditionMeter } from "../../general/ConditionMeter";
import { Input } from "../../general/Input";
import Source from "../../general/Source";
import AssetAbility from "../AssetAbility";
import IAssetAttachment from "../AssetAttachment";
import AssetId from "../AssetId";
import AssetType from "../AssetType";

// interface for outgoing json + dezerialization

export default interface IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetType;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: Input[] | undefined;
  Requirement?: string | undefined;
  Abilities: AssetAbility[];
  "Condition Meter"?: ConditionMeter | undefined;
  Source: Source;
}
