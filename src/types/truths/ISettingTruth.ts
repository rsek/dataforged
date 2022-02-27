import ISource from "../general/interfaces/ISource";
import ISettingTruthTableRow from "./ISettingTruthTableRow";
import ISuggestions from '../general/interfaces/ISuggestions';
import ISuggestionsYaml from "../general/interfaces/ISuggestionsYaml";


export default interface ISettingTruth {
  $id: string;
  Name: string;
  Table: ISettingTruthTableRow[];
  Character: string;
  Suggestions?: ISuggestionsYaml | undefined;
  Source: ISource;
}
