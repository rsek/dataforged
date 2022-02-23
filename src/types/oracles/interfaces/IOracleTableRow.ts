import IMultipleRolls from "./IMultipleRolls";
import OracleTableId from "../OracleTableId";
import OracleTableRowId from "../OracleTableRowId";
import UrlString from "../../general/UrlString";
import TemplateString from "../TemplateString";
import GameObject from "../../gameobjects/GameObject";
import IAttribute from "../../gameobjects/IAttribute";
import ISuggestions from "../../general/interfaces/ISuggestions";

export default interface IOracleTableRow {
  $id: OracleTableRowId;
  Floor: number;
  Ceiling: number;
  Result: string;
  Summary?: string | undefined;
  Image?: UrlString | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: IOracleTableRow[] | undefined;
  "Game objects"?: GameObject[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
  Suggestions?: ISuggestions | undefined;
  Attributes?: IAttribute[] | undefined;
  Template?: TemplateString | undefined;
}
