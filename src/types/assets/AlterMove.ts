import type { AssetAbilityId } from "./AssetAbility.js";
import type IAlterMove from "./interfaces/IAlterMove.js";
import type IAlterMoveYaml from "./interfaces/IAlterMoveYaml.js";
import type { IHasId } from "../general/Id.js";
import type MoveId from "../moves/MoveId.js";
import type { MoveIdGeneric } from "../moves/MoveId.js";
import MoveTrigger from "../moves/MoveTrigger.js";

export type AlterMoveId = `${AssetAbilityId} / Alter ${MoveId | MoveIdGeneric}`;

export default class AlterMove implements IAlterMove, Omit<IHasId, "Name"> {
  $id: AlterMoveId;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMoveYaml, id: AlterMoveId) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
  }
}
