import IAssetYaml from "./IAssetYaml";
import { IInput, Input } from "../../general/Input";
import { IHasId } from "../../general/Id";
import IAssetAbilityYaml from "./IAssetAbilityYaml";
import IMove from "../../moves/interfaces/IMove";
import IAlterMove from "./IAlterMove";

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
