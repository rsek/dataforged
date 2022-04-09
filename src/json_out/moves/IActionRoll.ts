import type { ICustomStat, RollableStat } from "@json_out/index.js";

export interface IActionRoll {
  Stat?: RollableStat | undefined;
  "Custom stat"?: ICustomStat | undefined;
  "All of"?: RollableStat[] | undefined;
  "Best of"?: RollableStat[] | undefined;
  "Worst of"?: RollableStat[] | undefined;
}
