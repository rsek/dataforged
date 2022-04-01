import type ISettingTruthTableRow from "./ISettingTruthTableRow.js";
import type ISource from "../general/interfaces/ISource.js";
import type ISuggestionsYaml from "../general/interfaces/ISuggestionsYaml.js";

export default interface ISettingTruth {
  $id: string;
  Name: string;
  Table: ISettingTruthTableRow[];
  Character: string;
  Suggestions?: ISuggestionsYaml | undefined;
  Source: ISource;
}
