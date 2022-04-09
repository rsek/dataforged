import { ActionRoll } from "@classes/index.js";
import type { FragmentString, IActionRoll, IMoveTriggerOption, IProgressRoll } from "@json_out/index.js";
import type { IMoveTriggerOptionYaml } from "@yaml_in/moves/IMoveTriggerOptionYaml.js";

export class MoveTriggerOption implements IMoveTriggerOption {
  $id: string;
  Text?: FragmentString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  constructor(json: IMoveTriggerOptionYaml, id: string) {
    this.$id = id;
    this.Text = json.Text;
    if (json["Action roll"]) {
      this["Action roll"] = new ActionRoll(json["Action roll"], this);
    }
    this["Progress roll"] = json["Progress roll"];
  }
}
