import IMove from "../../moves/interfaces/IMove";
import MoveId from "../../moves/MoveId";
import IMoveTriggerData from "../../moves/IMoveTriggerData";

export default interface IAlterMoveData extends Omit<Partial<IMove>, "$id"> {
  Move: MoveId;
  Trigger: IMoveTriggerData;
}
