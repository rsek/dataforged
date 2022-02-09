import { ProgressType } from "./Progress";
import { ICustomStat, RollableStat } from "./Stat";

export interface IActionRoll {
  Stat: RollableStat;
  "All of": RollableStat[];
  "Best of": RollableStat[];
  "Worst of": RollableStat[];
}

export interface IProgressRoll {
  Track: ProgressType;
  "All of": ProgressType[]
  "Best of": ProgressType[];
  "Worst of": ProgressType[];
}

export interface ICustomStatRoll {
  Name: string; // "Challenge Rank", etc - handle as type?
  Options: ICustomStat[];
  // some kind of pointer to what it's keying from, if anything?
}