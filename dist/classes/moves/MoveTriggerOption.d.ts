import type { FragmentString, IActionRoll, IMoveTriggerOption, IProgressRoll } from "../../../dist/json_out/index.js";
import type { IMoveTriggerOptionYaml } from "../../../dist/yaml_in/moves/IMoveTriggerOptionYaml.js";
export declare class MoveTriggerOption implements IMoveTriggerOption {
    $id: string;
    Text?: FragmentString | undefined;
    "Action roll"?: IActionRoll | undefined;
    "Progress roll"?: IProgressRoll | undefined;
    constructor(json: IMoveTriggerOptionYaml, id: string);
}
//# sourceMappingURL=MoveTriggerOption.d.ts.map