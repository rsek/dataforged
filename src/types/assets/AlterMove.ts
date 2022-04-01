import type IAlterMove from "./interfaces/IAlterMove.js";
import type IAlterMoveYaml from "./interfaces/IAlterMoveYaml.js";
import type { IHasId } from "../general/Id.js";
import type MoveId from "../moves/MoveId.js";
import MoveTrigger from "../moves/MoveTrigger.js";

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
