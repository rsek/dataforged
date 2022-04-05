import type IMoveTriggerOption from "./IMoveTriggerOption.js";
import type { FragmentString } from "../../general/StringTypes.js";

export default interface IMoveTrigger {
  // TODO: type MoveTriggerId
  $id: string;
  Text: FragmentString;
  Options?: IMoveTriggerOption[] | undefined;
}
