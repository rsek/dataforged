

import type ISettingTruth from "./ISettingTruth.js";
import SettingTruthOption from "./SettingTruthOption.js";
import buildLog from "../../functions/logging/buildLog.js";
import type { IHasId } from "../general/Id.js";
import type ISource from "../general/interfaces/ISource.js";
import type IRules from "../general/IRules.js";
import Source from "../general/Source.js";
import type { ParagraphsString } from "../general/StringTypes.js";
import Suggestions from "../general/Suggestions.js";

export type SettingTruthName = string;
export type SettingTruthId = `Setting Truths / ${SettingTruthName}`;

export default class SettingTruth implements Omit<ISettingTruth, "Suggestions">, IRules {
  $id: SettingTruthId;
  Name: SettingTruthName;
  Table: SettingTruthOption[];
  Character: ParagraphsString;
  Suggestions?: Suggestions | undefined;
  Source: Source;
  constructor(json: ISettingTruth, sourceJson: ISource) {
    this.$id = `Setting Truths / ${json.Name}`;
    buildLog(this.constructor,`Building: ${this.$id}`);
    this.Name = json.Name;
    this.Table = json.Table.map(row => new SettingTruthOption(this.$id, row));
    this.Character = json.Character;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Source = new Source(json.Source, sourceJson);
  }
}