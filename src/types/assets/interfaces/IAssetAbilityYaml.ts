
// interface for incoming data

import { IInput, Input } from "../../general/Input";
import IMove from "../../moves/interfaces/IMove";
import IAlterMoveYaml from "./IAlterMoveYaml";
import IAssetYaml from "./IAssetYaml";

export default interface IAssetAbilityYaml {
  $id?: string | undefined;
  Text: string;
  Enabled?: boolean | undefined;
  Move?: IMove | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
  "Alter Properties"?: Partial<IAssetYaml> | undefined;
}
