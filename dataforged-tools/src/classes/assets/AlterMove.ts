import _ from "lodash-es";
import { MoveTrigger } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AlterMoveId, IAlterMove, IAsset, IAssetAbility } from "@json_out/index.js";
import type { IMove, IMoveTrigger, MoveIdBase } from "@json_out/moves/index.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import type { IAlterMoveYaml } from "@yaml_in/assets/IAlterMoveYaml.js";

/**
 * @internal
 */
export class AlterMove implements IAlterMove {
  $id: AlterMoveId;
  Moves: IMove["$id"][] | null;
  Trigger?: MoveTrigger | undefined;
  constructor(json: IAlterMoveYaml, parent: IAssetAbility, index: number) {
    this.$id = `${parent.$id}/Alter_Moves/${index+1}`;
    this.Moves = json.Moves ?? null;
    if (json.Trigger) {
      const triggerClone = _.cloneDeep(json.Trigger);
      this.Trigger = new MoveTrigger(triggerClone, (`${this.$id}/Trigger` as IMoveTrigger["$id"]));
    }
  }
}
