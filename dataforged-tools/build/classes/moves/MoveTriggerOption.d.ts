import type { ICustomStat, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionBase, IMoveTriggerOptionProgress, ProgressType, RollableStat } from "../../json_out/index.js";
import { RollMethod, RollType } from "../../json_out/index.js";
import type { IMoveTriggerOptionActionYaml, IMoveTriggerOptionProgressYaml, YamlStub } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare abstract class MoveTriggerOption implements IMoveTriggerOptionBase {
    $id: IMoveTriggerOptionBase["$id"];
    Text?: string | undefined;
    "Roll type": RollType;
    Method: RollMethod;
    Using: (RollableStat | ProgressType)[];
    "Custom stat"?: ICustomStat | undefined;
    constructor(json: YamlStub<IMoveTriggerOptionBase, "Using" | "Method" | "Roll type">, parent: IMoveTrigger, index: number);
}
/**
 * @internal
 */
export declare class MoveTriggerOptionAction extends MoveTriggerOption implements IMoveTriggerOptionAction {
    "Roll type": RollType.Action;
    Using: RollableStat[];
    constructor(json: IMoveTriggerOptionActionYaml, parent: IMoveTrigger, index: number);
}
/**
 * @internal
 */
export declare class MoveTriggerOptionProgress extends MoveTriggerOption implements IMoveTriggerOptionProgress {
    "Roll type": RollType.Progress;
    Using: ProgressType[];
    constructor(json: IMoveTriggerOptionProgressYaml, parent: IMoveTrigger, index: number);
}
//# sourceMappingURL=MoveTriggerOption.d.ts.map