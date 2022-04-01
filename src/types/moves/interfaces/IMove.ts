import type IMoveOutcomes from "./IMoveOutcomes.js";
import type IMoveTriggerYaml from "./IMoveTriggerYaml.js";
import type ISource from "../../general/interfaces/ISource.js";
import type ISuggestions from "../../general/interfaces/ISuggestions.js";
import type MdString from "../../general/MdString.js";
import type OracleTableId from "../../oracles/OracleTableId.js";
import type MoveCategoryName from "../MoveCategoryName.js";
import type MoveId from "../MoveId.js";

export default interface IMove {
  $id?: MoveId | undefined;
  Name: string;
  Category: MoveCategoryName;
  "Progress Move"?: boolean | undefined;
  "Variant of"?: MoveId | undefined;
  Trigger: IMoveTriggerYaml;
  Text: MdString;
  Oracles?: OracleTableId[] | undefined;
  Source?: ISource | undefined;
  Suggestions?: ISuggestions | undefined;
  Outcomes?: IMoveOutcomes | undefined;
}
