import IMultipleRolls from "./IMultipleRolls";
import OracleTableId from "../OracleTableId";
import OracleTableRowId from "../OracleTableRowId";
import UrlString from "../../general/UrlString";
import TemplateString from "../TemplateString";
import IAttributeChoices from "../../gameobjects/IAttributeChoices";
import ISuggestions from "../../general/interfaces/ISuggestions";
import IGameObject from "../../gameobjects/IGameObject";
import { IRowRollData } from "./IRowData";

export default interface IOracleTableRow {
  $id?: OracleTableRowId | undefined;
  Floor: IRowRollData[0];
  Ceiling: IRowRollData[1];
  Result: string;
  Summary?: string | undefined;
  Image?: UrlString | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: IOracleTableRow[] | undefined;
  "Game objects"?: IGameObject[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
  Suggestions?: ISuggestions | undefined;
  Attributes?: IAttributeChoices[] | undefined;
  Template?: TemplateString | undefined;
}
