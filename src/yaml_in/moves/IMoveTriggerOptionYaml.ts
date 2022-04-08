import type { IActionRoll, IProgressRoll, ParagraphsString } from "@dataforged/json_out/index.js";

export interface IMoveTriggerOptionYaml {
  Text?: ParagraphsString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
