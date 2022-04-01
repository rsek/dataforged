import type IAlterMoveYaml from "./IAlterMoveYaml.js";
import type IMoveTriggerYaml from "../../moves/interfaces/IMoveTriggerYaml.js";
import type MoveId from "../../moves/MoveId.js";

// interface for outgoing JSON + deserialization

export default interface IAlterMove extends IAlterMoveYaml {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerYaml;
}
