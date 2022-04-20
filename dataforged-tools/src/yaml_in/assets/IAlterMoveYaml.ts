import type { IAlterMove } from "@json_out/index.js";
import type { IMoveTriggerYaml } from "@yaml_in/moves/IMoveTriggerYaml.js";

export interface IAlterMoveYaml extends Omit<IAlterMove, "$id"|"Trigger"> {
  Trigger: IMoveTriggerYaml;
}
