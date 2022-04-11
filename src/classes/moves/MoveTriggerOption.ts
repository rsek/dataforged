import { CustomStat } from "@classes/moves/CustomStat.js";
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
    this["Roll type"] = json["Roll type"];
    this.Method = json.Method ?? RollMethod.Any;
    this.Using = json.Using ?? [];
    if (json["Custom stat"]){
      this["Custom stat"] = new CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
      this.Using.forEach(item => {
        if (item === "${{Custom stat}}" && this["Custom stat"]) {
          item = this["Custom stat"].$id;
        }
      });
    }
  }
}