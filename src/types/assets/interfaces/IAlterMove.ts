import IMoveTriggerYaml from "../../moves/interfaces/IMoveTriggerYaml";
import MoveId from "../../moves/MoveId";
import IAlterMoveYaml from "./IAlterMoveYaml";

// interface for outgoing JSON + deserialization

export default interface IAlterMove extends IAlterMoveYaml {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerYaml;
}
