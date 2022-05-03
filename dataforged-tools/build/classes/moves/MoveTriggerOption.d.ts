import type { ICustomStat, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionBase, IMoveTriggerOptionProgress, ProgressTypeIronsworn, ProgressTypeStarforged, RollableStat } from "../../json_out/index.js";
import { RollMethod, RollType } from "../../json_out/index.js";
import type { IMoveTriggerOptionActionYaml, IMoveTriggerOptionProgressYaml } from "../../yaml_in/index.js";
/**
 * @internal
 */
export declare abstract class MoveTriggerOption implements IMoveTriggerOptionBase {
    $id: IMoveTriggerOptionBase["$id"];
    Text?: string | undefined;
    "Roll type": RollType;
    Method: RollMethod;
    Using: (RollableStat | ProgressTypeStarforged | ProgressTypeIronsworn)[];
    "Custom stat"?: ICustomStat | undefined;
    constructor(json: IMoveTriggerOptionActionYaml | IMoveTriggerOptionProgressYaml, parent: IMoveTrigger, index: number);
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
    Using: (ProgressTypeStarforged | ProgressTypeIronsworn)[];
    constructor(json: IMoveTriggerOptionProgressYaml, parent: IMoveTrigger, index: number);
}
//# sourceMappingURL=MoveTriggerOption.d.ts.map