
import _ from "lodash-es";
import { is } from "typescript-is";
import AlterMove from "./AlterMove.js";
import type AssetId from "./AssetId.js";
import type IAsset from "./interfaces/IAsset.js";
import type IAssetAbility from "./interfaces/IAssetAbility.js";
import type IAssetAbilityYaml from "./interfaces/IAssetAbilityYaml.js";
import type IAssetYaml from "./interfaces/IAssetYaml.js";
import badJsonError from "../../functions/logging/badJsonError.js";
import { ClockInput, NumberInput, SelectInput, TextInput } from "../general/Input.js";
import type { IClockInput, IInput, INumberInput, ISelectInput , ITextInput } from "../general/Input.js";
import type MdString from "../general/MdString.js";
import Move from "../moves/Move.js";
import type MoveId from "../moves/MoveId.js";
import type { MoveIdGeneric } from "../moves/MoveId.js";

export type AssetAbilityId = `${AssetId} / Abilities / ${1|2|3}`;

export default class AssetAbility implements IAssetAbility {
  $id: AssetAbilityId;
  Text: MdString;
  Moves?: Move[] | undefined;
  Inputs?: IInput[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetYaml> | undefined;
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
        return new Move(moveData);
      });
    }
    if (json.Inputs) {
      this.Inputs = (json.Inputs as IInput[]).map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
        if (is<INumberInput>(inputJson)) {
          return new NumberInput(inputJson, idString);
        } else if (is<ISelectInput>(inputJson)) {
          return new SelectInput(inputJson, idString);
        } else if (is<ITextInput>(inputJson)) {
          return new TextInput(inputJson, idString);
        } else if (is<IClockInput>(inputJson)) {
          return new ClockInput(inputJson, idString);
        } else { throw new Error("Unable to assign input data to a type - make sure it's correct."); }
      }) as IInput[];
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
