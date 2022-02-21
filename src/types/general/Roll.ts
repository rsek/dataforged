import t from 'ts-runtime/lib';

import { ProgressType } from "./Progress";
import { CustomStat, ICustomStat, RollableStat } from "./Stat";

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

export class CustomStatRoll implements ICustomStatRoll {
  $id: string;
  Name: string;
  Options: CustomStat[];
  constructor(json: ICustomStatRoll, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Options = json.Options?.map(option => new CustomStat(option, `${id} / ${option.Name}`));
  }

}