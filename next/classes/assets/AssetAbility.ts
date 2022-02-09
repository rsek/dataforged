import { IMove, Move } from "../moves/Move";
import { IAsset } from "./Asset";
import { Counter, ICounter } from "../generic/Counter";

export class AssetAbility implements IAssetAbility {
  $id: string;
  Text: string;
  Move?: Move | undefined;
  Counter?: Counter | undefined;
  Input?: string[] | undefined;
  "Alter Moves"?: Partial<IMove>[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
  Enabled: boolean;
  constructor(json: IAssetAbility, id: string) {

    this.$id = id;
    this.Text = json.Text;
    this.Move = json.Move ? new Move(json.Move, this.$id + "/ Move") : undefined;
    this.Counter = json.Counter ? new Counter(json.Counter, this.$id + " / Counter") : undefined;
    this.Input = json.Input;
    this["Alter Moves"] = json["Alter Moves"];
    this["Alter Properties"] = json["Alter Properties"];
    this.Enabled = json.Enabled ?? false;
  }
}

export interface IAssetAbility {
  $id?: string | undefined;
  Text: string;
  Enabled?: boolean | undefined;
  Move?: IMove | undefined;
  Counter?: ICounter | undefined;
  Input?: string[] | undefined;
  "Alter Moves"?: Partial<IMove>[] | undefined;
  "Alter Properties"?: Partial<IAsset> | undefined;
}
