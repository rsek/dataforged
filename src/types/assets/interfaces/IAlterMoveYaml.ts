import IMove from "../../moves/interfaces/IMove";
import IMoveTriggerYaml from "../../moves/interfaces/IMoveTriggerYaml";
import MoveId from "../../moves/MoveId";

export default interface IAlterMoveYaml extends Omit<Partial<IMove>, "$id"> {
  Move: MoveId;
  Trigger: IMoveTriggerYaml;
}
