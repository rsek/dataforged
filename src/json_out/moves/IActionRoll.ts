import type { ICustomStat, RollableStat } from "@json_out/index.js";

/**
 * Describes an Action Roll made as part of a {@link IMove | move}.
 * @see {@link IMoveTrigger} {@link IMoveTriggerOption}
 * @public
 */
export interface IActionRoll {
  /**
   * Make a single action roll with a stat or condition meter.
   */
  Stat?: RollableStat | undefined;
  /**
   * Make a roll that uses a custom value in place of of stat or condition meter.
   */
  "Custom stat"?: ICustomStat | undefined;
  /**
   * Make a roll for *every* stat in the array.
   */
  "All of"?: RollableStat[] | undefined;
  /**
   * Make a roll for the highest stat in the array.
   */
  "Best of"?: RollableStat[] | undefined;
  /**
   * Make a roll for the lowest stat in the array.
   */
  "Worst of"?: RollableStat[] | undefined;
}
