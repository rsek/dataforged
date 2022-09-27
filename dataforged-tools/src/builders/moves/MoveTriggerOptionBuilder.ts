import { CustomStatBuilder } from "@builders";
import type { CustomStat, MoveTrigger , MoveTriggerOptionAction, MoveTriggerOptionBase, MoveTriggerOptionProgress, ProgressTypeIronsworn, ProgressTypeStarforged, RollableStat, YamlMoveTriggerOptionAction as yaml, YamlMoveTriggerOptionProgress } from "@schema";
import { Replacement, RollMethod, RollType } from "@schema";

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
  constructor(yaml: yaml|YamlMoveTriggerOptionProgress, parent: MoveTrigger, index: number) {
    this.$id = `${parent.$id}/Options/${index+1}`;
    this.Text = yaml.Text;
    this["Roll type"] = yaml["Roll type"] ?? RollType.Action;
    this.Method = yaml.Method ?? RollMethod.Any;
    this.Using = (yaml.Using as typeof this["Using"]) ?? [];
    if (yaml["Custom stat"]) {
      this["Custom stat"] = new CustomStatBuilder(yaml["Custom stat"], this.$id);
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
  constructor(yaml: yaml, parent: MoveTrigger, index: number) {
    super(yaml, parent, index);
  }
}

/**
 * @internal
 */
export class MoveTriggerOptionProgressBuilder extends MoveTriggerOptionBuilder implements MoveTriggerOptionProgress {
  "Roll type": RollType.Progress;
  Using!: (ProgressTypeStarforged|ProgressTypeIronsworn)[];
  constructor(yaml: YamlMoveTriggerOptionProgress, parent: MoveTrigger, index: number) {
    super(yaml, parent, index);
  }
}