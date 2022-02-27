import { IHasId } from "../general/Id";
import MoveId from "../moves/MoveId";
import MoveTrigger from "../moves/MoveTrigger";
import IAlterMove from "./interfaces/IAlterMove";
import IAlterMoveYaml from "./interfaces/IAlterMoveYaml";


export default class AlterMove implements IAlterMove, Omit<IHasId, "Name"> {
  $id: string;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveYaml, id: string) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    // asset trigger ID
    // Moves / Strike / Trigger / Assets / Gunner / Abilities / 1 /
  }
}
