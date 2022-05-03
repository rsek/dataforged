import type { IConditionMeter, ICustomStat, PlayerConditionMeter, Stat } from "../index.js";
/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | ICustomStat["$id"] | PlayerConditionMeter | IConditionMeter["$id"];
//# sourceMappingURL=RollableStat.d.ts.map