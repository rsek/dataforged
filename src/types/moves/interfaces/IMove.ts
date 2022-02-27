import MdString from "../../general/MdString";
import ISource from "../../general/interfaces/ISource";
import OracleTableId from "../../oracles/OracleTableId";
import IMoveOutcomes from "./IMoveOutcomes";
import MoveId from '../MoveId';
import MoveCategory from "../MoveCategory";
import ISuggestions from "../../general/interfaces/ISuggestions";
import IMoveTriggerYaml from "./IMoveTriggerYaml";


export default interface IMove {
  $id?: MoveId | undefined;
  Name: string;
  Category: MoveCategory;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: MoveId | undefined;
  Trigger: IMoveTriggerYaml;
  Text: MdString;
  Oracles?: OracleTableId[] | undefined;
  Source?: ISource | undefined;
  Suggestions?: ISuggestions | undefined;
  Outcomes?: IMoveOutcomes | undefined;
}
