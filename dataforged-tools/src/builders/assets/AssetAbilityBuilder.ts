import { AlterMomentumBuilder , AlterMoveBuilder , MoveBuilder } from "@builders";
import { AssetAlterPropertiesBuilder } from "@builders/assets/AssetAlterPropertiesBuilder.js";
import type { AlterMomentum, AlterMove, Asset , AssetAbility, Gamespace, InputClock, InputNumber, InputSelect, InputText, Move } from "@schema_json";
import { Replacement } from "@schema_json";
import type { YamlAssetAbility } from "@schema_yaml";
import { formatId } from "@utils";
import { pickInput } from "@utils/object_transform/pickInput.js";
import { replaceInAllStrings } from "@utils/object_transform/replaceInAllStrings.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetAbilityBuilder implements AssetAbility {
  $id: AssetAbility["$id"];
  Label?: string | undefined;
  Text: string;
  Moves?: Move[] | undefined;
  Inputs?: (InputNumber | InputClock | InputText | InputSelect)[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: AssetAbility["Alter Properties"] | undefined;
  "Alter Momentum"?: AlterMomentum | undefined;
  Enabled: boolean;
  constructor(json: YamlAssetAbility, id: AssetAbility["$id"], gamespace: Gamespace, parent: Asset) {
    this.$id = id;
    this.Label = json.Label;
    this.Text = json.Text;
    if (json.Inputs) {
      this.Inputs = json.Inputs.map(inputJson => pickInput(inputJson, this));
    }

    this.Enabled = json.Enabled ?? false;
    if (json["Alter Momentum"]) {
      this["Alter Momentum"] = new AlterMomentumBuilder(json["Alter Momentum"], this);
    }
    this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove, index) => {
      if (parent.Usage.Shared && !alterMove.Trigger?.By) {
        if (!alterMove.Trigger) {
          alterMove.Trigger = {};
        }
        alterMove.Trigger.By = { Player: true, Ally: true };
      }
      const newData = new AlterMoveBuilder(alterMove, this, index);
      return newData;
    }) : json["Alter Moves"];
    if (json["Alter Properties"]){
      this["Alter Properties"] = new AssetAlterPropertiesBuilder(json["Alter Properties"], this.$id);
    }
    if (json.Moves) {
      this.Moves = json.Moves.map(moveJson => {
        const moveDataClone = _.cloneDeep(moveJson);
        moveDataClone.Asset = parent.$id;
        const fragment = moveDataClone._idFragment ?? moveDataClone.Title.Canonical;
        moveDataClone.$id = formatId(fragment,this.$id).replace("/Assets/", "/Moves/Assets/");
        moveDataClone.Category = `${gamespace}/Moves/Assets`;
        if (moveDataClone.Trigger.Options && parent["Condition Meter"]?.$id) {
          moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, Replacement.AssetMeter, parent["Condition Meter"].$id);
          // console.log("asset ability move data", moveDataClone);
        }
        return new MoveBuilder(moveDataClone, this, gamespace, parent.Source);
      });
    }
  }
  // TODO: validate Ids
}