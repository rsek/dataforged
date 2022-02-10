import { ConditionMeterType } from "./ConditionMeter";
import { ProgressType } from "./Progress";

export type StatType = "Edge" | "Heart" | "Iron" | "Shadow" | "Wits";

export type RollableStat = StatType | ConditionMeterType | ProgressType;

export interface ICustomStat {
  Name: string;
  Value: number;
  // reference to item?
}
