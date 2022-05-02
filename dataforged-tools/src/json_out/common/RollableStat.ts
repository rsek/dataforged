import type { IConditionMeter } from "@json_out/index.js";
import type { ICustomStat } from "@json_out/index.js";
import type { PlayerConditionMeter, Stat } from "@json_out/index.js";

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export type RollableStat = Stat | ICustomStat["$id"] |  PlayerConditionMeter | IConditionMeter["$id"];
