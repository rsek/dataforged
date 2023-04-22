import { MoveTriggerOptionAction, MoveTriggerOptionProgress } from "./MoveTriggerOption.js";
import type { IAlterMove, IMove, IMoveTrigger, IMoveTriggerBy } from "../../json_out/index.js";
import type { IAlterMoveTriggerYaml, IMoveTriggerYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare class MoveTrigger implements IMoveTrigger {
    $id: IMoveTrigger["$id"];
    "Options"?: (MoveTriggerOptionAction | MoveTriggerOptionProgress)[] | undefined;
    Text?: string | undefined;
    By?: IMoveTriggerBy | undefined;
    constructor(json: IMoveTriggerYaml | IAlterMoveTriggerYaml, parent: IAlterMove | IMove);
}
//# sourceMappingURL=MoveTrigger.d.ts.map