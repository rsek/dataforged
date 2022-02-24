import IMove from "../../moves/interfaces/IMove";
import IMoveTriggerData from "../../moves/interfaces/IMoveTriggerData";
import MoveId from "../../moves/MoveId";

export default interface IAlterMoveData extends Omit<Partial<IMove>, "$id"> {
  Move: MoveId;
  Trigger: IMoveTriggerData;
}
