import ISource from "../general/interfaces/ISource";
import ITruthTableRow from "./ITruthTableRow";
import ISuggestions from '../general/interfaces/ISuggestions';
import ISuggestionsData from "../general/interfaces/ISuggestionsData";


export default interface ITruth {
  $id: string;
  Name: string;
  Table: ITruthTableRow[];
  Character: string;
  Suggestions?: ISuggestionsData | undefined;
  Source: ISource;
}
