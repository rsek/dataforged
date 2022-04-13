import { MoveTrigger } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AlterMoveId, IAlterMove, IAsset, IAssetAbility } from "@json_out/index.js";
import type { IMove, IMoveTrigger, MoveIdBase } from "@json_out/moves/index.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import type { IAlterMoveYaml } from "@yaml_in/assets/IAlterMoveYaml.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AlterMove implements IAlterMove {
  $id: AlterMoveId;
  Move?: IMove["$id"] | null;
  Trigger?: MoveTrigger | undefined;
  constructor(json: IAlterMoveYaml, parent: IAssetAbility, grandparent: IAsset, gamespace: Gamespace) {
    let moveIdFragment = "Moves/*" as MoveIdBase;
    if (json.Move) {
      moveIdFragment = json.Move.replace(gamespace+"/", "") as MoveIdBase;
    }
    this.$id = `${parent.$id}/Alter_${moveIdFragment}`;
    this.Move = json.Move ?? null;
    if (json.Trigger) {
      const triggerClone = _.cloneDeep(json.Trigger);
      if (grandparent["Condition Meter"]?.$id) {
        triggerClone.Options = replaceInAllStrings(triggerClone.Options, "${{Asset_Condition_Meter}}", grandparent["Condition Meter"].$id as string);
      }
      this.Trigger = new MoveTrigger(triggerClone, (`${this.$id}/Trigger` as IMoveTrigger["$id"]));
    }
  }
}
