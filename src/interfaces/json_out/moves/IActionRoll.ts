import type { RollableStat } from "@dataforged/constants/RollableStat.js";
import type { ICustomStat } from "@dataforged/interfaces/json_out/index.js";

export interface IActionRoll {
  Stat?: RollableStat | undefined;
  "Custom stat"?: ICustomStat | undefined;
  "All of"?: RollableStat[] | undefined;
  "Best of"?: RollableStat[] | undefined;
  "Worst of"?: RollableStat[] | undefined;
}
