import { IMove, MoveId } from "../moves/Move";
import { IHasId } from "../general/Id";
import { IMoveTriggerData, MoveTrigger } from "../moves/MoveTrigger";

export interface IAlterMoveData extends Omit<Partial<IMove>, "$id"> {
  Move: MoveId;
  Trigger: IMoveTriggerData;
}
// interface for outgoing JSON + deserialization

export interface IAlterMove extends IAlterMoveData {
  $id: string;
  Move: MoveId;
  Trigger: IMoveTriggerData;
}

export class AlterMove implements IAlterMove, Omit<IHasId, "Name"> {
  $id: string;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveData, id: string) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    // asset trigger ID
    // Moves / Strike / Trigger / Assets / Gunner / Abilities / 1 /
  }
}
