import type { IMove, MoveId } from "@dataforged/json_out/index.js";
import type { IMoveTriggerYaml } from "@dataforged/yaml_in/index.js";

export interface IAlterMove extends Omit<Partial<IMove>, "$id"> {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerYaml;
}
