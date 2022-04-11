import { MoveTriggerOption } from "@classes/index.js";
import type { IMoveTrigger, IMoveTriggerOption } from "@json_out/index.js";
import type { RollType } from "@json_out/moves/RollMethod.js";
import type { IMoveTriggerYaml } from "@yaml_in/moves/IMoveTriggerYaml.js";


/**
 * @internal
 */
export class MoveTrigger implements IMoveTrigger {
  $id: IMoveTrigger["$id"];
  "Options"?: MoveTriggerOption<RollType>[] | undefined;
  Text: string;
  constructor(json: IMoveTriggerYaml, id: IMoveTrigger["$id"]) {
    this.$id = id;
    this.Text = json.Text;
    this["Options"] = json.Options?.map((option, index) => new MoveTriggerOption<typeof option["Roll type"]>(option, this, index));
  }
}

