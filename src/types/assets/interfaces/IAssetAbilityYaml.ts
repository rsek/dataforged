
// interface for incoming data

import type IAlterMoveYaml from "./IAlterMoveYaml.js";
import type IAssetYaml from "./IAssetYaml.js";
import type { IInput, Input } from "../../general/Input.js";
import type IMove from "../../moves/interfaces/IMove.js";

export default interface IAssetAbilityYaml {
  $id?: string | undefined;
  Text: string;
  Enabled?: boolean | undefined;
  Move?: IMove | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
  "Alter Properties"?: Partial<IAssetYaml> | undefined;
}
