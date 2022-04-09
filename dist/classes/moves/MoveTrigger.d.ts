import { MoveTriggerOption } from "../index.js";
import type { FragmentString, IMoveTrigger } from "../../json_out/index.js";
import type { IMoveTriggerYaml } from "../../yaml_in/moves/IMoveTriggerYaml.js";
export declare class MoveTrigger implements IMoveTrigger {
    $id: string;
    Text: FragmentString;
    Options?: MoveTriggerOption[] | undefined;
    constructor(json: IMoveTriggerYaml, id: string);
}
//# sourceMappingURL=MoveTrigger.d.ts.map