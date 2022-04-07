
import AlterMove from "@dataforged/classes/assets/AlterMove.js";
import type { IAssetInput, IClockInputYaml, INumberInputYaml, ISelectInputYaml, ITextInputYaml } from "@dataforged/classes/common/IInput.js";

import { ClockInput, NumberInput, SelectInput, TextInput } from "@dataforged/classes/common/Input.js";
import InputType from "@dataforged/classes/common/InputType.js";
import Move from "@dataforged/classes/moves/Move.js";
import type IAsset from "@dataforged/interfaces/json_out/assets/IAsset.js";
import type IAssetAbility from "@dataforged/interfaces/json_out/assets/IAssetAbility.js";
import type IAssetAbilityYaml from "@dataforged/interfaces/yaml_in/assets/IAssetAbilityYaml.js";
import type { AssetAbilityId } from "@dataforged/strings/id/AssetAbilityId.js";
import type { MoveIdGeneric } from "@dataforged/strings/id/MoveId.js";
import type MoveId from "@dataforged/strings/id/MoveId.js";
import type { ParagraphsString } from "@dataforged/strings/MdString.js";
import badJsonError from "@dataforged/utils/logging/badJsonError.js";
import _ from "lodash-es";
import { is } from "typescript-is";

export default class AssetAbility implements IAssetAbility {
  $id: AssetAbilityId;
  Text: ParagraphsString;
  Moves?: Move[] | undefined;
  Inputs?: IAssetInput[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbilityYaml, id: AssetAbilityId, parent: IAsset) {
    this.$id = id;
    this.Text = json.Text;
    if (json.Moves) {
      if (!Array.isArray(json.Moves)) {
        throw badJsonError(this.constructor, json, "Moves is not an array.");
      }
      this.Moves = json.Moves.map(mv => {
        const moveData = _.cloneDeep(mv);
        moveData.$id = `Moves / ${this.$id} / ${mv.Name}` as MoveId;
        moveData.Asset = parent.$id;
        moveData.Category = "Moves / Assets";
        return new Move(moveData, parent.Source);
      });
    }
    if (json.Inputs) {
      this.Inputs = json.Inputs.map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
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
    this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove) => {
      const moveId: MoveId | MoveIdGeneric = alterMove.Move ?? "Moves / *";
      const newData = new AlterMove(alterMove, `${this.$id} / Alter ${moveId}`);
      return newData;
    }) : json["Alter Moves"];
    this["Alter Properties"] = json["Alter Properties"];
    this.Enabled = json.Enabled ?? false;
  }
}
