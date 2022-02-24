import t from 'ts-runtime/lib';
import { is } from 'typescript-is';
import { Input, IInput, INumberInput, NumberInput, ISelectInput, SelectInput, ITextInput, TextInput } from '../general/Input';
import Move from '../moves/Move';
import AlterMove from './AlterMove';
import IAssetAbility from './interfaces/IAssetAbility';
import IAssetAbilityData from './interfaces/IAssetAbilityData';
import IAssetData from './interfaces/IAssetData';

export default class AssetAbility implements IAssetAbility {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Inputs?: IInput[] | undefined;
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
        if (is<INumberInput>(inputJson)) {
          return new NumberInput(inputJson, idString);
        }
        else if (is<ISelectInput>(inputJson)) {
          return new SelectInput(inputJson, idString);
        }
        else if (is<ITextInput>(inputJson)) {
          return new TextInput(inputJson, idString);
        }
        else { new Error("Unable to assign input data to a type - make sure it's correct."); }
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
