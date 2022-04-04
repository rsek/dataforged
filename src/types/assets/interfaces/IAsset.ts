import type IAssetAbility from "./IAssetAbility.js";
import type { IConditionMeter } from "../../general/ConditionMeter.js";
import type IDisplay from "../../general/IDisplay.js";
import type { IInput } from "../../general/Input.js";
import type ISource from "../../general/interfaces/ISource.js";
import type MdString from "../../general/MdString.js";
import type Tuple from "../../general/Tuple.js";
import type IAssetAttachment from "../AssetAttachment.js";
import type AssetId from "../AssetId.js";
import type AssetTypeId from "../AssetTypeId.js";

// interface for outgoing json + dezerialization

export default interface IAsset {
  $id: AssetId;
  Name: string;
  Aliases?: string[] | undefined;
  "Asset Type": AssetTypeId;
  Attachments?: IAssetAttachment | undefined;
  Inputs?: IInput[] | undefined;
  Requirement?: MdString | undefined;
  Abilities: Tuple<IAssetAbility, 3>;
  "Condition Meter"?: IConditionMeter | undefined;
  Source: ISource;
  Display?: IDisplay | undefined;
}
