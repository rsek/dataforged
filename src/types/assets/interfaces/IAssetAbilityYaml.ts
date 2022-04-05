import type IAlterMoveYaml from "./IAlterMoveYaml.js";
import type IAssetYaml from "./IAssetYaml.js";
import type { IInput, Input } from "../../general/Input.js";
import type { ParagraphsString } from "../../general/StringTypes.js";
import type IMove from "../../moves/interfaces/IMove.js";

// interface for incoming data

export default interface IAssetAbilityYaml {
  $id?: string | undefined;
  Text: ParagraphsString;
  Enabled?: boolean | undefined;
  Moves?: IMove[] | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  "Alter Moves"?: IAlterMoveYaml[] | undefined;
  "Alter Properties"?: Partial<IAssetYaml> | undefined;
}
