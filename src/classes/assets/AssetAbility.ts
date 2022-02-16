

import { IMove, Move } from "../moves/Move";
import { IAsset, IAssetData } from "./Asset";
import { IInput, Input, isNumberInput, isSelectInput, isTextInput, NumberInput, SelectInput, TextInput } from "../general/Input";
import { IHasId } from "../general/Id";
import { AlterMove, IAlterMoveData } from "./AlterMove";

// interface for outgoing JSON + deserialization
export interface IAssetAbility extends IAssetAbilityData, Omit<IHasId, "Name"> {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Inputs?: Input[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetData> | undefined;
  Enabled: boolean;
}

// interface for incoming data
export interface IAssetAbilityData {
  $id?: string | undefined;
  Text: string;
  Enabled?: boolean | undefined;
  Move?: IMove | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  "Alter Moves"?: IAlterMoveData[] | undefined;
  "Alter Properties"?: Partial<IAssetData> | undefined;
}



export class AssetAbility implements IAssetAbility {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Inputs?: Input[] | undefined;
  "Alter Moves"?: AlterMove[] | undefined;
  "Alter Properties"?: Partial<IAssetData> | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbilityData, id: string) {
    this.$id = id;
    this.Text = json.Text;
    this.Move = json.Move ? new Move(json.Move, `Moves / ${this.$id}`) : undefined;
    if (json.Inputs) {
      this.Inputs = (json.Inputs as IInput[]).map(inputJson => {
        const idString = `${this.$id} / Inputs / ${inputJson.Name}`;
        if (isNumberInput(inputJson)) {
          return new NumberInput(inputJson, idString);
        }
        else if (isSelectInput(inputJson)) {
          return new SelectInput(inputJson, idString);
        }
        else if (isTextInput(inputJson)) {
          return new TextInput(inputJson, idString);
        }
        else { new Error("Unable to assign input data to a type - make sure it's correct."); }
      }) as Input[];
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
