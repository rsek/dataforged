import type { IProgressRoll } from "@dataforged/interfaces/json_out/moves/IProgressRoll";
import type { FragmentString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { IActionRoll } from "@dataforged/interfaces/json_out/moves/IActionRoll";

export interface IMoveTriggerOption {
  // TODO: MoveTriggerOptionId
  $id: string;
  Text?: FragmentString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
