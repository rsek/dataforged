import { AlterMomentumBuilder, AlterMoveBuilder, MoveBuilder } from "@builders";
import { AlterAssetBuilder } from "@builders/assets/AssetAlterPropertiesBuilder.js";
import { Replacement } from "@schema";
import type { AlterMomentum , AlterMove, Asset, AssetAbility, AssetAbilityAlter, Game, InputClock, InputNumber, InputSelect, InputText , Move , YamlAssetAbility } from "@schema";
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
  Inputs?: {[key:string]:(InputNumber | InputClock | InputText | InputSelect)} | undefined;
  Alter?: AssetAbilityAlter | undefined;
  Enabled: boolean;
  constructor(yaml: YamlAssetAbility, id: AssetAbility["$id"], game: Game, parent: Asset) {
    this.$id = id;
    this.Label = yaml.Label;
    this.Text = yaml.Text;
    if (yaml.Inputs) {
      this.Inputs = _.mapValues(yaml.Inputs,inputJson => pickInput(inputJson, this));
    }

    this.Enabled = yaml.Enabled ?? false;
    if (yaml["Alter momentum"]) {
      this["Alter momentum"] = new AlterMomentumBuilder(yaml["Alter momentum"], this);
    }
    this["Alter moves"] = yaml["Alter moves"] ? yaml["Alter moves"].map((alterMove, index) => {
      if (parent.Usage.Shared && !alterMove.Trigger?.By) {
        if (!alterMove.Trigger) {
          alterMove.Trigger = {};
        }
        alterMove.Trigger.By = { Player: true, Ally: true };
      }
      const newData = new AlterMoveBuilder(alterMove, this, index);
      return newData;
    }) : yaml["Alter moves"];
    if (yaml["Alter properties"]){
      this["Alter properties"] = new AlterAssetBuilder(yaml["Alter properties"], this.$id);
    }
    if (yaml.Moves) {
      this.Moves = yaml.Moves.map(moveJson => {
        const moveDataClone = _.cloneDeep(moveJson);
        moveDataClone.Asset = parent.$id;
        const fragment = moveDataClone._idFragment ?? moveDataClone.Title.Canonical;
        moveDataClone.$id = formatId(fragment,this.$id).replace("/Assets/", "/Moves/Assets/");
        moveDataClone.Category = `${game}/Moves/Assets`;
        if (moveDataClone.Trigger.Options && parent["Condition meter"]?.$id) {
          moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, Replacement.AssetMeter, parent["Condition meter"].$id);
          // console.log("asset ability move data", moveDataClone);
        }
        return new MoveBuilder(moveDataClone, this, game, parent.Source);
      });
    }
  }
  // TODO: validate Ids
}