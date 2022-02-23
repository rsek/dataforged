import IMoveTriggerOption from "./IMoveTriggerOption";


export default interface IMoveTrigger {
  $id: string;
  Text: string;
  Options?: IMoveTriggerOption[] | undefined;
}
