import type { IMoveTriggerBy } from "@json_out/index.js";
import type { IMoveTriggerOption } from "@json_out/moves/IMoveTriggerOption.js";
import type { RollType } from "@json_out/moves/RollMethod.js";
import type { IMoveTriggerOptionYaml } from "@yaml_in/moves/index.js";

export interface IMoveTriggerYaml {
  Text?: string | undefined;
  By?: IMoveTriggerBy;
  Options?: IMoveTriggerOptionYaml<RollType>[] | undefined;
}
