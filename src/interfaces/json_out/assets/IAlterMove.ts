import type IMove from "@dataforged/interfaces/json_out/moves/IMove.js";
import type IMoveTriggerYaml from "@dataforged/interfaces/yaml_in/moves/IMoveTriggerYaml.js";
import type MoveId from "@dataforged/strings/id/MoveId.js";

export default interface IAlterMove extends Omit<Partial<IMove>, "$id"> {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerYaml;
}
