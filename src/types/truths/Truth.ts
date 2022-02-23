
import t from 'ts-runtime/lib';
import { IHasId } from "../general/Id";
import Source from "../general/Source";
import ISource from "../general/interfaces/ISource";
import Suggestions from "../general/Suggestions";
import { ISuggestions } from "../general/ISuggestions";
import { ITruthTableRow, TruthTableRow } from "./TruthTableRow";

export interface ITruth {
  $id: string;
  Name: string;
  Table: ITruthTableRow[];
  Character: string;
  Suggestions?: ISuggestions | undefined;
  Source: ISource;
}

export class Truth implements ITruth, IHasId {
  $id: string;
  Name: string;
  Table: ITruthTableRow[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Source: Source;
  constructor(json: ITruth, sourceJson: ISource) {
    this.$id = `Setting Truths / ${json.Name}`;
    console.info(`[Truth.constructor] Building ${this.$id}`);
    this.Name = json.Name;
    // console.info(`table data:`, json.Table);
    this.Table = json.Table.map(row => new TruthTableRow(this.$id, row));
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source, sourceJson);
  }
}