import { CustomStatOptionBuilder } from "@builders";
import type { CustomStat, MoveTriggerOptionBase } from "@schema_json";
import { formatId } from "@utils";
import type { YamlCustomStat } from "@schema_yaml";


/**
 * @internal
 */
export class CustomStatBuilder implements CustomStat {
  $id: CustomStat["$id"];
  Label: string;
  Options: CustomStatOptionBuilder[];
  constructor(json: YamlCustomStat, parentId: MoveTriggerOptionBase["$id"]) {
    this.$id = formatId("Custom stat", parentId);
    this.Label = json.Label;
    this.Options = json.Options?.map(option => new CustomStatOptionBuilder(option, this.$id));
  }
}
