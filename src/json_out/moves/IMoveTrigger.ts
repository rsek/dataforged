import type { FragmentString , IMoveTriggerOption } from "@json_out/index.js";

export interface IMoveTrigger {
  // TODO: type MoveTriggerId
  $id: string;
  Text: FragmentString;
  Options?: IMoveTriggerOption[] | undefined;
}
