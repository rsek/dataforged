import { CustomStatBuilder } from "@builders";
import type { CustomStat, MoveTrigger, MoveTriggerOptionAction, MoveTriggerOptionBase, MoveTriggerOptionProgress, ProgressTypeIronsworn, ProgressTypeStarforged, RollableStat } from "@schema_json";
import { Replacement , RollMethod , RollType } from "@schema_json";
import type { YamlMoveTriggerOptionAction, YamlMoveTriggerOptionProgress } from "@schema_yaml";

/**
 * @internal
 */
export abstract class MoveTriggerOptionBuilder implements MoveTriggerOptionBase {
  $id: MoveTriggerOptionBase["$id"];
  Text?: string | undefined;
  "Roll type": RollType;
  Method: RollMethod;
  Using: (RollableStat | ProgressTypeStarforged|ProgressTypeIronsworn)[];
  "Custom stat"?: CustomStat | undefined;
  constructor(json: YamlMoveTriggerOptionAction|YamlMoveTriggerOptionProgress, parent: MoveTrigger, index: number) {
    this.$id = `${parent.$id}/Options/${index+1}`;
    this.Text = json.Text;
    this["Roll type"] = json["Roll type"] ?? RollType.Action;
    this.Method = json.Method ?? RollMethod.Any;
    this.Using = (json.Using as typeof this["Using"]) ?? [];
    if (json["Custom stat"]) {
      this["Custom stat"] = new CustomStatBuilder(json["Custom stat"], this.$id);
      if (this.Using && this["Custom stat"]) {
        this.Using = this.Using.map(item => (item ) === Replacement.CustomStat ? this["Custom stat"]?.$id : item) as typeof this["Using"];
      }
    }
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionActionBuilder extends MoveTriggerOptionBuilder implements MoveTriggerOptionAction {
  "Roll type": RollType.Action;
  Using!: RollableStat[];
  constructor(json: YamlMoveTriggerOptionAction, parent: MoveTrigger, index: number) {
    super(json, parent, index);
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionProgressBuilder extends MoveTriggerOptionBuilder implements MoveTriggerOptionProgress {
  "Roll type": RollType.Progress;
  Using!: (ProgressTypeStarforged|ProgressTypeIronsworn)[];
  constructor(json: YamlMoveTriggerOptionProgress, parent: MoveTrigger, index: number) {
    super(json, parent, index);
  }
}