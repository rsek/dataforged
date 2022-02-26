
import t from 'ts-runtime/lib';
import { IHasId } from "../general/Id";
import Source from "../general/Source";
import ISource from "../general/interfaces/ISource";
import Suggestions from "../general/Suggestions";
import TruthTableRow from "./TruthTableRow";
import ITruthTableRow from "./ITruthTableRow";
import ITruth from './ITruth';
import buildLog from '../../functions/buildLog';

export class Truth implements Omit<ITruth, "Suggestions">, IHasId {
  $id: string;
  Name: string;
  Table: ITruthTableRow[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Source: Source;
  constructor(json: ITruth, sourceJson: ISource) {
    this.$id = `Setting Truths / ${json.Name}`;
    buildLog(this.constructor, `Building ${this.$id}`);
    this.Name = json.Name;
    // console.info(`table data:`, json.Table);
    this.Table = json.Table.map(row => new TruthTableRow(this.$id, row));
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source, sourceJson);
  }
}