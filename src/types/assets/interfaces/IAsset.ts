import type IAssetAbility from "./IAssetAbility.js";
import type { IConditionMeter } from "../../general/ConditionMeter.js";
import { ConditionMeter } from "../../general/ConditionMeter.js";
import type { IInput } from "../../general/Input.js";
import { Input } from "../../general/Input.js";
import type ISource from "../../general/interfaces/ISource.js";
import Source from "../../general/Source.js";
import AssetAbility from "../AssetAbility.js";
import type IAssetAttachment from "../AssetAttachment.js";
import type AssetId from "../AssetId.js";
import type AssetType from "../AssetType.js";

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
