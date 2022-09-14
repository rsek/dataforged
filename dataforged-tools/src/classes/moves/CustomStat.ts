import { CustomStatOption } from "@classes/index.js";
import type { ICustomStat, IMoveTriggerOptionBase } from "@json_out/index.js";
import { formatIdFragment } from "@utils/formatIdFragment.js";
import type { ICustomStatYaml } from "@yaml_in/index.js";


/**
 * @internal
 */
export class CustomStat implements ICustomStat {
  $id: ICustomStat["$id"];
  Label: string;
  Options: CustomStatOption[];
  constructor(json: ICustomStatYaml, parentId: IMoveTriggerOptionBase["$id"]) {
    this.$id = `${parentId}/${formatIdFragment("Custom stat")}`;
    this.Label = json.Label;
    this.Options = json.Options?.map(option => new CustomStatOption(option, this.$id));
  }
}
