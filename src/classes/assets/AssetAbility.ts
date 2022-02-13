

import { IMove, Move, MoveId } from "../moves/Move";
import { IAsset } from "./Asset";
import { IInput, Input, isNumberInput, isSelectInput, isTextInput, NumberInput, SelectInput, TextInput } from "../general/Input";
import { IHasId } from "../general/Id";
import { IMoveTrigger, MoveTrigger } from "../moves/MoveTrigger";

interface IAlterMove extends Omit<Partial<IMove>, "$id"> {
  Move: MoveId;
  Trigger: IMoveTrigger;
}

export class AlterMove implements IAlterMove, Omit<IHasId, "Name"> {
  $id: string;
  Move: MoveId;
  Trigger: MoveTrigger;
  constructor(json: IAlterMove, id: string) {
    this.$id = id;
    this.Move = json.Move;
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    // asset trigger ID
    // Moves / Strike / Trigger / Assets / Gunner / Abilities / 1 /
  }
}

export class AssetAbility implements IAssetAbility, Omit<IHasId, "Name"> {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Inputs?: Input[] | undefined;
  "Alter Moves"?: IAlterMove[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbility, id: string) {
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

export interface IAssetAbility {
  $id?: string | undefined;
  Text: string;
  Enabled?: boolean | undefined;
  Move?: IMove | undefined;
  Inputs?: IInput[] | Input[] | undefined;
  "Alter Moves"?: IAlterMove[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
}
