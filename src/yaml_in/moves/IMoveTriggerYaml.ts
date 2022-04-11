import type { IMoveTriggerOption } from "@json_out/moves/IMoveTriggerOption.js";
import type { RollType } from "@json_out/moves/RollMethod.js";

export interface IMoveTriggerYaml {
  Text: string;
  Options?: IMoveTriggerOption<RollType>[] | undefined;
}
