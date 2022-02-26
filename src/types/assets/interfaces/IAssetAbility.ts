import Move from "../../moves/Move";
import IAssetData from "./IAssetData";
import { IInput, Input } from "../../general/Input";
import { IHasId } from "../../general/Id";
import AlterMove from "../AlterMove";
import IAssetAbilityData from './IAssetAbilityData';
import IMove from "../../moves/interfaces/IMove";
import IAlterMove from "./IAlterMove";

// interface for outgoing JSON + deserialization

export default interface IAssetAbility extends IAssetAbilityData, Omit<IHasId, "Name"> {
  $id: string;
  Text: string;
  Move?: IMove | undefined;
  Inputs?: IInput[] | undefined;
  "Alter Moves"?: IAlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetData> | undefined;
  Enabled: boolean;
}
