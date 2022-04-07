import type { IActionRoll, IProgressRoll } from "@dataforged/classes/moves/MoveRoll.js";
import type { FragmentString } from "@dataforged/strings/MdString.js";

export default interface IMoveTriggerOption {
  // TODO: MoveTriggerOptionId
  $id: string;
  Text?: FragmentString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
