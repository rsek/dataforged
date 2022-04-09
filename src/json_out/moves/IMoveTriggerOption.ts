
import type { FragmentString, IActionRoll, IProgressRoll } from "@json_out/index.js";

export interface IMoveTriggerOption {
  // TODO: MoveTriggerOptionId
  $id: string;
  Text?: FragmentString | undefined;
  "Action roll"?: IActionRoll | undefined;
  "Progress roll"?: IProgressRoll | undefined;
}
