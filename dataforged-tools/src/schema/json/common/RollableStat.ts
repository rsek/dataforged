import type { ConditionMeter, CustomStat, PlayerConditionMeter, Stat } from "@schema";

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export type RollableStat = Stat | CustomStat["$id"] |  PlayerConditionMeter | ConditionMeter["$id"];
