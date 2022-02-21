
import t from 'ts-runtime/lib';
import { MdString } from "../general/MdString";
import { Source, ISource } from "../general/Source";
import { ISuggestions, Suggestions } from "../general/Suggestions";
import OracleTableId from "../oracles/OracleTableId";
import MoveOutcomes, { IMoveOutcomes } from "./MoveOutcome";
import { IMoveTriggerData, MoveTrigger } from "./MoveTrigger";

export type MoveId = `Moves / ${string}`;

export type MoveCategory = `${"Session" | "Adventure" | "Quest" | "Connection" | "Exploration" | "Combat" | "Suffer" | "Recover" | "Threshold" | "Legacy" | "Fate" | "Asset"} Moves`;

export class Move implements IMove {
  $id: MoveId;
  Name: string;
  Category: MoveCategory;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: MoveId | undefined;
  Trigger: MoveTrigger;
  Text: MdString;
  Oracles?: OracleTableId[] | undefined;
  Source?: Source | undefined;
  Suggestions?: Suggestions | undefined;
  Outcomes?: MoveOutcomes | undefined;
  constructor(json: IMove, id?: MoveId) {
    this.$id = id ?? `Moves / ${json.Name}`;
    console.info(`[Move.constructor] Building ${this.$id}...`);
    this.Name = json.Name;
    this.Category = json.Category;
    this["Progress Move"] = json["Progress Move"];
    this["Variant of"] = json["Variant of"];
    this.Trigger = new MoveTrigger(json.Trigger, `${this.$id} / Trigger`);
    this.Text = json.Text;
    this.Oracles = json.Oracles;
    this.Outcomes = json.Outcomes ? new MoveOutcomes(json.Outcomes, `${this.$id} / Outcomes`) : undefined;
    // this.Source = json.Source ? new Source(json.Source);

  }
}

export interface IMove {
  $id?: MoveId | undefined;
  Name: string;
  Category: MoveCategory;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: MoveId | undefined;
  Trigger: IMoveTriggerData;
  Text: MdString;
  Oracles?: OracleTableId[] | undefined;
  Source?: ISource | undefined;
  Suggestions?: ISuggestions | undefined;
  Outcomes?: IMoveOutcomes | undefined;
}



