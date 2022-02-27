import IMoveTriggerData from "../../moves/interfaces/IMoveTriggerData";
import MoveId from "../../moves/MoveId";
import IAlterMoveYaml from "./IAlterMoveYaml";

// interface for outgoing JSON + deserialization

export default interface IAlterMove extends IAlterMoveYaml {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerData;
}
