import type { ConditionMeterType } from "@json_out/common/ConditionMeterType.js";
import type { Stat } from "@json_out/index.js";

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 */
export type RollableStat = Stat | ConditionMeterType;
