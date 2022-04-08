import type { FragmentString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { IMoveTriggerOption } from "@dataforged/interfaces/json_out/moves/IMoveTriggerOption.js";

export interface IMoveTrigger {
  // TODO: type MoveTriggerId
  $id: string;
  Text: FragmentString;
  Options?: IMoveTriggerOption[] | undefined;
}
