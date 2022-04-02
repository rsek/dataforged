

import type { ConditionMeterType } from "./ConditionMeter.js";
import type { ProgressType } from "./Progress.js";

export type StatType = "Edge" | "Heart" | "Iron" | "Shadow" | "Wits";

export type RollableStat = StatType | ConditionMeterType | ProgressType;

export interface ICustomStat {
  $id?: string;
  Name: string;
  Value: number;
  // reference to item?
}

export class CustomStat implements ICustomStat {
  $id: string;
  Name: string;
  Value: number;
  constructor(json: ICustomStat, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Value = json.Value;
  }
}