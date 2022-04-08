import type { FragmentString , IMoveTriggerOption } from "@dataforged/json_out/index.js";

export interface IMoveTrigger {
  // TODO: type MoveTriggerId
  $id: string;
  Text: FragmentString;
  Options?: IMoveTriggerOption[] | undefined;
}
