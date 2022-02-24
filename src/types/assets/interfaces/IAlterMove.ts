import IMoveTriggerData from "../../moves/interfaces/IMoveTriggerData";
import MoveId from "../../moves/MoveId";
import IAlterMoveData from "./IAlterMoveData";

// interface for outgoing JSON + deserialization

export default interface IAlterMove extends IAlterMoveData {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerData;
}
