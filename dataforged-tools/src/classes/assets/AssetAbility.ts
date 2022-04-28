import type { Input } from "@classes/common/Input.js";
import { AlterMove , Move } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import { Replacement } from "@json_out/common/Replacement.js";
import type { AssetAbilityId, IAlterMomentum, IAsset, IAssetAbility,  InputType , MoveId } from "@json_out/index.js";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import type { IAssetAbilityYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetAbility implements IAssetAbility {
  $id: AssetAbilityId;
  Text: string;
  Moves?: Move[] | undefined;
  Inputs?: Input<InputType>[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
  "Alter Momentum"?: IAlterMomentum | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbilityYaml, id: AssetAbilityId, gamespace: Gamespace, parent: IAsset) {
    /* Setting the id of the asset ability. */
    this.$id = id;
    this.Text = json.Text;
    if (json.Inputs) {
      this.Inputs = json.Inputs.map(inputJson => pickInput(inputJson, this));
    }

    this.Enabled = json.Enabled ?? false;
    this["Alter Momentum"] = json["Alter Momentum"];
    this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove, index) => {
      if (parent.Usage.Shared && !alterMove.Trigger?.By) {
        if (!alterMove.Trigger) {
          alterMove.Trigger = {};
        }
        alterMove.Trigger.By = { Player: true, Ally: true };
      }
      const newData = new AlterMove(alterMove, this, index);
      return newData;
    }) : json["Alter Moves"];
    this["Alter Properties"] = json["Alter Properties"];
    if (json.Moves) {
      this.Moves = json.Moves.map(moveJson => {
        const moveDataClone = _.cloneDeep(moveJson);
        moveDataClone.Asset = parent.$id;
        moveDataClone.$id = `${this.$id.replace("/Assets/", "/Moves/Assets/")}/${moveDataClone.Name.replaceAll(" ", "_")}` as MoveId;
        moveDataClone.Category = `${gamespace}/Moves/Assets`;
        if (moveDataClone.Trigger.Options && parent["Condition Meter"]?.$id) {
          moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, Replacement.AssetMeter, parent["Condition Meter"].$id);
          // console.log("asset ability move data", moveDataClone);
        }
        return new Move(moveDataClone, gamespace, parent.Source);
      });
    }
  }
  // TODO: validate Ids
}
