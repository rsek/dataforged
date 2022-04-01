import type MdString from "../../general/MdString.js";
import type { IActionRoll, ICustomStatRoll, IProgressRoll } from "../../general/Roll.js";

export default interface IMoveTriggerOptionYaml {
  Text?: MdString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
  "Custom stat roll"?: ICustomStatRoll | undefined;
}
