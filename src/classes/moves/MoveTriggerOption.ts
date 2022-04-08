import type { IProgressRoll } from "@dataforged/interfaces/json_out/moves/IProgressRoll";
import { ActionRoll } from "@dataforged/classes/moves/MoveRoll.js";
import type { ParagraphsString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { IMoveTriggerOption } from "@dataforged/interfaces/json_out/index.js";
import type { IActionRoll } from "@dataforged/interfaces/json_out/moves/IActionRoll";
import type IMoveTriggerOptionYaml from "@dataforged/interfaces/yaml_in/moves/IMoveTriggerOptionYaml.js";

export default class MoveTriggerOption implements IMoveTriggerOption {
  $id: string;
  Text?: ParagraphsString | undefined;
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
