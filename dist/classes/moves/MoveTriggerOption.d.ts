import type { ICustomStat, IMoveTrigger, IMoveTriggerOption, ProgressType, RollableStat, RollType } from "../../json_out/index.js";
import { RollMethod } from "../../json_out/index.js";
import type { IMoveTriggerOptionYaml } from "../../yaml_in/moves/IMoveTriggerOptionYaml.js";
/**
 * @internal
 */
export declare class MoveTriggerOption<T extends RollType> implements IMoveTriggerOption<T> {
    $id: IMoveTriggerOption<T>["$id"];
    Text?: string | undefined;
    "Roll type": T;
    Method: RollMethod;
    Using: T extends RollType.Action ? RollableStat[] : T extends RollType.Progress ? ProgressType[] : (RollableStat[] | ProgressType[]);
    "Custom stat"?: ICustomStat | undefined;
    constructor(json: IMoveTriggerOptionYaml<T>, parent: IMoveTrigger, index: number);
}
//# sourceMappingURL=MoveTriggerOption.d.ts.map