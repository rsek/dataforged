import type { IMoveTriggerBy } from "../../json_out/index.js";
import type { RollType } from "../../json_out/moves/RollMethod.js";
import type { IMoveTriggerOptionYaml } from "./index.js";
export interface IMoveTriggerYaml {
    Text?: string | undefined;
    By?: IMoveTriggerBy;
    Options?: IMoveTriggerOptionYaml<RollType>[] | undefined;
}
//# sourceMappingURL=IMoveTriggerYaml.d.ts.map