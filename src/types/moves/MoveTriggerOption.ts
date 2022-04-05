

import { parent } from "jsonpath";
import type IMoveTriggerOption from "./interfaces/IMoveTriggerOption.js";
import type IMoveTriggerOptionYaml from "./interfaces/IMoveTriggerOptionYaml.js";
import type { IActionRoll, IProgressRoll } from "../general/Roll.js";
import { ActionRoll } from "../general/Roll.js";
import type { ParagraphsString } from "../general/StringTypes.js";

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
