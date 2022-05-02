import type { IConditionMeter } from "../index.js";
import type { ICustomStat } from "../index.js";
import type { PlayerConditionMeter, Stat } from "../index.js";
/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | ICustomStat["$id"] | PlayerConditionMeter | IConditionMeter["$id"];
//# sourceMappingURL=RollableStat.d.ts.map