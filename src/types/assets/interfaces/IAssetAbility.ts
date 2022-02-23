import Move from "../../moves/Move";
import IAssetData from "./IAssetData";
import { Input } from "../../general/Input";
import { IHasId } from "../../general/Id";
import AlterMove from "../AlterMove";
import IAssetAbilityData from './IAssetAbilityData';

// interface for outgoing JSON + deserialization

export default interface IAssetAbility extends IAssetAbilityData, Omit<IHasId, "Name"> {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Inputs?: Input[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetData> | undefined;
  Enabled: boolean;
}
