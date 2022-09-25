import { CustomStatOptionBuilder } from "@builders";
import type { CustomStat , CustomStatOption, MoveTriggerOptionBase, YamlCustomStat } from "@schema";
import { formatId } from "@utils";

/**
 * @internal
 */
export class CustomStatBuilder implements CustomStat {
  $id: CustomStat["$id"];
  Label: string;
  Options: CustomStatOption[];
  constructor(json: YamlCustomStat, parentId: MoveTriggerOptionBase["$id"]) {
    this.$id = formatId("Custom stat", parentId);
    this.Label = json.Label;
    this.Options = json.Options?.map(option => new CustomStatOptionBuilder(option, this.$id));
  }
}
