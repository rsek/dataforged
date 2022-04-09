import { MoveTriggerOption } from "../../../dist/classes/moves/MoveTriggerOption.js";
import type { FragmentString, IMoveTrigger } from "../../../dist/json_out/index.js";
import type { IMoveTriggerYaml } from "../../../dist/yaml_in/moves/IMoveTriggerYaml.js";
export declare class MoveTrigger implements IMoveTrigger {
    $id: string;
    Text: FragmentString;
    Options?: MoveTriggerOption[] | undefined;
    constructor(json: IMoveTriggerYaml, id: string);
}
//# sourceMappingURL=MoveTrigger.d.ts.map