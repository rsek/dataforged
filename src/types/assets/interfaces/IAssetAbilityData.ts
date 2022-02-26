
// interface for incoming data

import { IInput, Input } from "../../general/Input";
import IMove from "../../moves/interfaces/IMove";
import IAlterMoveData from "./IAlterMoveData";
import IAssetData from "./IAssetData";

export default interface IAssetAbilityData {
  $id?: string | undefined;
  Text: string;
  Enabled?: boolean | undefined;
  Move?: IMove | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  "Alter Moves"?: IAlterMoveData[] | undefined;
  "Alter Properties"?: Partial<IAssetData> | undefined;
}
