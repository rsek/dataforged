
import { is } from "typescript-is";
import AlterMove from "./AlterMove.js";
import type IAssetAbility from "./interfaces/IAssetAbility.js";
import type IAssetAbilityYaml from "./interfaces/IAssetAbilityYaml.js";
import type IAssetYaml from "./interfaces/IAssetYaml.js";
import { ClockInput, Input, NumberInput, SelectInput, TextInput } from "../general/Input.js";
import type { IClockInput, IInput, INumberInput, ISelectInput , ITextInput } from "../general/Input.js";
import Move from "../moves/Move.js";

export default class AssetAbility implements IAssetAbility {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Inputs?: IInput[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetYaml> | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbilityYaml, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Move = json.Move ? new Move(json.Move) : undefined;
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
        } else { new Error("Unable to assign input data to a type - make sure it's correct."); }
      }) as IInput[];
    }
    this["Alter Moves"] = json["Alter Moves"] ? json["Alter Moves"].map((alterMove) => {
      const moveId = alterMove.Move ?? "Moves / *";
      const newData = new AlterMove(alterMove, `${this.$id} / Alter ${moveId}`);
      return newData;
    }) : json["Alter Moves"];
    this["Alter Properties"] = json["Alter Properties"];
    this.Enabled = json.Enabled ?? false;
  }
}
