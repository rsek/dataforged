
import { AlterMove , ClockInput, Move, NumberInput, SelectInput , TextInput } from "@classes/index.js";
import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { AssetAbilityId, IAsset, IAssetAbility, IAssetInput, MoveId } from "@json_out/index.js";
import { InputType } from "@json_out/index.js";
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
  Inputs?: IAssetInput[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbilityYaml, id: AssetAbilityId, gamespace: Gamespace, parent: IAsset) {
    this.$id = id;
    this.Text = json.Text;
    if (json.Inputs) {
      this.Inputs = json.Inputs.map(inputJson => {
        const idString = `${this.$id}/Inputs/${inputJson.Name}`.replaceAll(" ", "_");
        switch (inputJson["Input Type"]) {
          case InputType.Clock: {
            return new ClockInput(inputJson, idString);
          }
          case InputType.Number: {
            return new NumberInput(inputJson, idString);
          }
          case InputType.Select:{
            return new SelectInput(inputJson, idString);
          }
          case InputType.Text: {
            return new TextInput(inputJson, idString);
          }
          default: {
            throw new Error("Unable to assign input data to a type - make sure it's correct.");
          }
        }
      }) as IAssetInput[];
    }

    this.Enabled = json.Enabled ?? false;
    this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove) => {
      const newData = new AlterMove(alterMove, this, parent, gamespace);
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
          moveDataClone.Trigger.Options = replaceInAllStrings(moveDataClone.Trigger.Options, "${{Asset_Condition_Meter}}", parent["Condition Meter"].$id);
          // console.log("asset ability move data", moveDataClone);
        }
        return new Move(moveDataClone, gamespace, parent.Source);
      });
    }
  }
  // TODO: validate Ids
}
