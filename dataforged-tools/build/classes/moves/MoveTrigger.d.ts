import { MoveTriggerOption } from "../index.js";
import type { IMoveTrigger, IMoveTriggerBy } from "../../json_out/index.js";
import type { RollType } from "../../json_out/moves/RollMethod.js";
import type { IMoveTriggerYaml } from "../../yaml_in/moves/IMoveTriggerYaml.js";
/**
 * @internal
 */
export declare class MoveTrigger implements IMoveTrigger {
    $id: IMoveTrigger["$id"];
    "Options"?: MoveTriggerOption<RollType>[] | undefined;
    Text?: string | undefined;
    By?: IMoveTriggerBy | undefined;
    constructor(json: IMoveTriggerYaml, id: IMoveTrigger["$id"]);
}
//# sourceMappingURL=MoveTrigger.d.ts.map