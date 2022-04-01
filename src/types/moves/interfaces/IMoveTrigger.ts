import type IMoveTriggerOption from "./IMoveTriggerOption.js";

export default interface IMoveTrigger {
  $id: string;
  Text: string;
  Options?: IMoveTriggerOption[] | undefined;
}
