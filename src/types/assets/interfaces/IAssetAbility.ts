import type IAlterMove from "./IAlterMove.js";
import type IAssetAbilityYaml from "./IAssetAbilityYaml.js";
import type IAssetYaml from "./IAssetYaml.js";
import type { IHasId } from "../../general/Id.js";
import type { IInput } from "../../general/Input.js";
import { Input } from "../../general/Input.js";
import type IMove from "../../moves/interfaces/IMove.js";

// interface for outgoing JSON + deserialization

export default interface IAssetAbility extends IAssetAbilityYaml, Omit<IHasId, "Name"> {
  $id: string;
  Text: string;
  Move?: IMove | undefined;
  Inputs?: IInput[] | undefined;
  "Alter Moves"?: IAlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetYaml> | undefined;
  Enabled: boolean;
}
