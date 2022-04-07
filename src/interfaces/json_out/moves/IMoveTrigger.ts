import type IMoveTriggerOption from "@dataforged/interfaces/json_out/moves/IMoveTriggerOption.js";
import type { FragmentString } from "@dataforged/strings/MdString.js";

export default interface IMoveTrigger {
  // TODO: type MoveTriggerId
  $id: string;
  Text: FragmentString;
  Options?: IMoveTriggerOption[] | undefined;
}
