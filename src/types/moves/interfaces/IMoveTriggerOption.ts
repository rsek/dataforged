import type { IActionRoll, IProgressRoll } from "../../general/Roll.js";
import type { FragmentString } from "../../general/StringTypes.js";

export default interface IMoveTriggerOption {
  // TODO: MoveTriggerOptionId
  $id: string;
  Text?: FragmentString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
