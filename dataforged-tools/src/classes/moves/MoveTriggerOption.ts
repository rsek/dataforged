import { CustomStat } from "@classes/moves/CustomStat.js";
import type { ICustomStat, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionBase, IMoveTriggerOptionProgress, ProgressType, RollableStat } from "@json_out/index.js";
import { Replacement , RollMethod , RollType } from "@json_out/index.js";
import type { IMoveTriggerOptionActionYaml, IMoveTriggerOptionProgressYaml, YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */
export abstract class MoveTriggerOption implements IMoveTriggerOptionBase {
  $id: IMoveTriggerOptionBase["$id"];
  Text?: string | undefined;
  "Roll type": RollType;
  Method: RollMethod;
  Using: (RollableStat | ProgressType)[];
  "Custom stat"?: ICustomStat | undefined;
  constructor(json: YamlStub<IMoveTriggerOptionBase, "Using"|"Method"|"Roll type">, parent: IMoveTrigger, index: number) {
    this.$id = `${parent.$id}/Options/${index+1}`;
    this.Text = json.Text;
    this["Roll type"] = json["Roll type"] ?? RollType.Action;
    this.Method = json.Method ?? RollMethod.Any;
    this.Using = (json.Using as typeof this["Using"]) ?? [];
    if (json["Custom stat"]) {
      this["Custom stat"] = new CustomStat(json["Custom stat"], `${this.$id}/Custom_stat`);
      if (this.Using && this["Custom stat"]) {
        this.Using = this.Using.map(item => (item ) === Replacement.CustomStat ? this["Custom stat"]?.$id : item) as typeof this["Using"];
      }
    }
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionAction extends MoveTriggerOption implements IMoveTriggerOptionAction {
  "Roll type": RollType.Action;
  Using!: RollableStat[];
  constructor(json: IMoveTriggerOptionActionYaml, parent: IMoveTrigger, index: number) {
    super(json, parent, index);
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionProgress extends MoveTriggerOption implements IMoveTriggerOptionProgress {
  "Roll type": RollType.Progress;
  Using!: ProgressType[];
  constructor(json: IMoveTriggerOptionProgressYaml, parent: IMoveTrigger, index: number) {
    super(json, parent, index);
  }
}