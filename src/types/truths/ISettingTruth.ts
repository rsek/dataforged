import ISource from "../general/interfaces/ISource";
import ISettingTruthTableRow from "./ISettingTruthTableRow";
import ISuggestions from '../general/interfaces/ISuggestions';
import ISuggestionsData from "../general/interfaces/ISuggestionsData";


export default interface ISettingTruth {
  $id: string;
  Name: string;
  Table: ISettingTruthTableRow[];
  Character: string;
  Suggestions?: ISuggestionsData | undefined;
  Source: ISource;
}
