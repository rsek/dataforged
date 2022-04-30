import type { IConditionMeter } from "./IConditionMeter.js";
import type { ICustomStat } from "./ICustomStat.js";
import type { PlayerConditionMeter, Stat } from "../index.js";
/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | ICustomStat["$id"] | PlayerConditionMeter | IConditionMeter["$id"];
//# sourceMappingURL=RollableStat.d.ts.map