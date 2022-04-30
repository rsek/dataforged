import { CustomStat } from "@classes/moves/CustomStat.js";
import { Replacement } from "@json_out/common/Replacement.js";
import type { ICustomStat, IMoveTrigger, IMoveTriggerOption, ProgressType, RollableStat, RollType } from "@json_out/index.js";
import { RollMethod } from "@json_out/index.js";
import type { IMoveTriggerOptionYaml } from "@yaml_in/moves/IMoveTriggerOptionYaml.js";

/**
 * @internal
 */
export class MoveTriggerOption<T extends RollType> implements IMoveTriggerOption<T> {
  $id: IMoveTriggerOption<T>["$id"];
  Text?: string | undefined;
  "Roll type": T;
  Method: RollMethod;
  Using: T extends RollType.Action ? RollableStat[] : T extends RollType.Progress ? ProgressType[] : (RollableStat[] | ProgressType[]);
  "Custom stat"?: ICustomStat | undefined;
  constructor(json: IMoveTriggerOptionYaml<T>, parent: IMoveTrigger, index: number) {
    this.$id = `${parent.$id}/Options/${index+1}`;
    this.Text = json.Text;
    this["Roll type"] = json["Roll type"] ?? "Action roll";
    this.Method = json.Method ?? RollMethod.Any;
    // if (json.Using && json.Using.includes(Replacement.AssetMeter)) {
    //   throw badJsonError(this.constructor, json, "`Using` includes an unexpected template string. It should be replaced before being sent to this constructor.");
    // } else {
    this.Using = (json.Using as typeof this["Using"]) ?? [];
    // }
    if (json["Custom stat"]) {
      this["Custom stat"] = new CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
      if (this.Using && this["Custom stat"]) {
        this.Using = this.Using.map(item => (item ) === Replacement.CustomStat ? this["Custom stat"]?.$id : item) as typeof this["Using"];
      }
    }
  }
}