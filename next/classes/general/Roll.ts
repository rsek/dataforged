import { ProgressType } from "./Progress";
import { ICustomStat, RollableStat } from "./Stat";

export interface IActionRoll {
  Stat?: RollableStat | undefined;
  "All of"?: RollableStat[] | undefined;
  "Best of"?: RollableStat[] | undefined;
  "Worst of"?: RollableStat[] | undefined;
}

export interface IProgressRoll {
  Track?: ProgressType | undefined;
  "All of"?: ProgressType[] | undefined;
  "Best of"?: ProgressType[] | undefined;
  "Worst of"?: ProgressType[] | undefined;
}

export interface ICustomStatRoll {
  Name: string; // "Challenge Rank", etc - handle as type?
  Options: ICustomStat[];
  // some kind of pointer to what it's keying from, if anything?
}