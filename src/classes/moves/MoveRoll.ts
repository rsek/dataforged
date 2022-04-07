import CustomStatOption from "@dataforged/classes/common/CustomStatOption.js";
import type MoveTriggerOption from "@dataforged/classes/moves/MoveTriggerOption.js";
import type { ProgressType } from "@dataforged/constants/Progress.js";
import type { RollableStat } from "@dataforged/constants/RollableStat.js";
import type ICustomStatOption from "@dataforged/interfaces/json_out/assets/ICustomStatOption.js";

export class ActionRoll implements IActionRoll {
  Stat?: RollableStat | undefined;
  "Custom stat"?: CustomStat | undefined;
  "All of"?: RollableStat[] | undefined;
  "Best of"?: RollableStat[] | undefined;
  "Worst of"?: RollableStat[] | undefined;
  constructor(json: IActionRoll, parent: MoveTriggerOption) {
    this.Stat = json.Stat;
    this["All of"] = json["All of"];
    this["Best of"] = json["Best of"];
    this["Worst of"] = json["Worst of"];
    if (json["Custom stat"]) {
      this["Custom stat"] = json["Custom stat"] ? new CustomStat(json["Custom stat"], parent.$id + " / Custom stat") : undefined;
    }
  }
}

export interface IActionRoll {
  Stat?: RollableStat | undefined;
  "Custom stat"?: ICustomStat | undefined;
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

export interface ICustomStat {
  Name: string; // "Challenge Rank", etc - handle as type?
  Options: ICustomStatOption[];
  // some kind of pointer to what it's keying from, if anything?
}

export class CustomStat implements ICustomStat {
  $id: string;
  Name: string;
  Options: CustomStatOption[];
  constructor(json: ICustomStat, id: string) {
    this.$id = id;
    this.Name = json.Name;
    this.Options = json.Options?.map(option => new CustomStatOption(option, `${id} / ${option.Name}`));
  }
}