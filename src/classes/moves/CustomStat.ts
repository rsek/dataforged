import { CustomStatOption } from "@classes/index.js";
import type { ICustomStat } from "@json_out/index.js";


/**
 * @internal
 */
export class CustomStat implements ICustomStat {
  $id: ICustomStat["$id"];
  Name: string;
  Options: CustomStatOption[];
  constructor(json: ICustomStat, id: ICustomStat["$id"]) {
    this.$id = id;
    this.Name = json.Name;
    this.Options = json.Options?.map(option => new CustomStatOption(option, `${id}/${option.Name.replaceAll(" ", "_")}`));
  }
}
