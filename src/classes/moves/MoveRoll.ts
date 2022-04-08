import { CustomStatOption } from "@dataforged/classes/common/CustomStatOption.js";
import type { MoveTriggerOption } from "@dataforged/classes/moves/MoveTriggerOption.js";
import type { IActionRoll, ICustomStat, RollableStat } from "@dataforged/json_out/index.js";

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