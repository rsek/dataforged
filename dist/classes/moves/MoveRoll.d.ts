import { CustomStatOption } from "../../../dist/classes/common/CustomStatOption.js";
import type { MoveTriggerOption } from "@dataforged/classes/moves/MoveTriggerOption.js";
import type { IActionRoll, ICustomStat, RollableStat } from "../../../dist/json_out/index.js";
export declare class ActionRoll implements IActionRoll {
    Stat?: RollableStat | undefined;
    "Custom stat"?: CustomStat | undefined;
    "All of"?: RollableStat[] | undefined;
    "Best of"?: RollableStat[] | undefined;
    "Worst of"?: RollableStat[] | undefined;
    constructor(json: IActionRoll, parent: MoveTriggerOption);
}
export declare class CustomStat implements ICustomStat {
    $id: string;
    Name: string;
    Options: CustomStatOption[];
    constructor(json: ICustomStat, id: string);
}
//# sourceMappingURL=MoveRoll.d.ts.map