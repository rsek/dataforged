

import { IHasId } from "../general/Id";
import Source from "../general/Source";
import ISource from "../general/interfaces/ISource";
import Suggestions from "../general/Suggestions";
import SettingTruthTableRow from "./SettingTruthTableRow";
import ISettingTruthTableRow from "./ISettingTruthTableRow";
import ISettingTruth from './ISettingTruth';
import buildLog from '../../functions/logging/buildLog';

export default class SettingTruth implements Omit<ISettingTruth, "Suggestions">, IHasId {
  $id: string;
  Name: string;
  Table: ISettingTruthTableRow[];
  Character: string;
  Suggestions?: Suggestions | undefined;
  Source: Source;
  constructor(json: ISettingTruth, sourceJson: ISource) {
    this.$id = `Setting Truths / ${json.Name}`;
    buildLog(this.constructor, `Building: ${this.$id}`);
    this.Name = json.Name;
    // console.info(`table data:`, json.Table);
    this.Table = json.Table.map(row => new SettingTruthTableRow(this.$id, row));
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source, sourceJson);
  }
}