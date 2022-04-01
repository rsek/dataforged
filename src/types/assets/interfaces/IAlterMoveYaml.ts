import type IMove from "../../moves/interfaces/IMove.js";
import type IMoveTriggerYaml from "../../moves/interfaces/IMoveTriggerYaml.js";
import type MoveId from "../../moves/MoveId.js";

export default interface IAlterMoveYaml extends Omit<Partial<IMove>, "$id"> {
  Move: MoveId;
  Trigger: IMoveTriggerYaml;
}
