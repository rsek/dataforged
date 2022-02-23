import MoveId from "../../moves/MoveId";
import IMoveTriggerData from "../../moves/IMoveTriggerData";
import IAlterMoveData from "./IAlterMoveData";

// interface for outgoing JSON + deserialization

export default interface IAlterMove extends IAlterMoveData {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerData;
}
