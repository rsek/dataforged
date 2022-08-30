import { AssetState } from "@classes/assets/AssetState.js";
import type { InputClock, InputNumber, InputText } from "@classes/common/Input.js";
import { AlterMove , Move } from "@classes/index.js";
import type { Gamespace , IAlterMomentum, IAsset, IAssetAbility,  IAssetState } from "@json_out/index.js";
import { Replacement } from "@json_out/index.js";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IAssetAbilityYaml } from "@yaml_in/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetAbility implements IAssetAbility {
  $id: IAssetAbility["$id"];
  Name?: string | undefined;
  Label?: string | undefined;
  Text: string;
  Moves?: Move[] | undefined;
  Inputs?: (InputNumber|InputClock|InputText)[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: IAssetAbility["Alter Properties"] | undefined;
  "Alter Momentum"?: IAlterMomentum | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbilityYaml, id: IAssetAbility["$id"], gamespace: Gamespace, parent: IAsset) {
    this.$id = id;
    this.Name = json.Name;
    this.Label = json.Label;
    this.Text = json.Text;
    if (json.Inputs) {
      this.Inputs = json.Inputs.map(inputJson => pickInput(inputJson, this)) as (InputNumber|InputClock|InputText)[];
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
    if (this["Alter Properties"]?.States) {
      this["Alter Properties"].States = this["Alter Properties"].States.map(state => new AssetState(state as IAssetState, this));
    }
    if (json.Moves) {
      this.Moves = json.Moves.map(moveJson => {
        const moveDataClone = _.cloneDeep(moveJson);
        moveDataClone.Asset = parent.$id;
        moveDataClone.$id = `${this.$id.replace("/Assets/", "/Moves/Assets/")}/${formatIdFragment(moveDataClone.Name)}`;
        moveDataClone.Category = `${gamespace}/Moves/Assets`;
        if (moveDataClone.Trigger.Options && parent["Condition Meter"]?.$id) {
          moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, Replacement.AssetMeter, parent["Condition Meter"].$id);
          // console.log("asset ability move data", moveDataClone);
        }
        return new Move(moveDataClone, this, gamespace, parent.Source);
      });
    }
  }
  // TODO: validate Ids
}
