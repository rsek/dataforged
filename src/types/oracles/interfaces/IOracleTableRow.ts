import IMultipleRolls from "./IMultipleRolls";
import OracleTableId from "../OracleTableId";
import OracleTableRowId from "../OracleTableRowId";
import IGameObjectData from "../../gameobjects/IGameObjectData";
import { ISuggestions } from "../../general/Suggestions";
import { UrlString } from "../../general/UrlString";
import { Attribute } from "../../gameobjects/GameObjectAttribute";
import TemplateString from "../TemplateString";


export default interface IOracleTableRow {
  $id: OracleTableRowId;
  Floor: number;
  Ceiling: number;
  Result: string;
  Summary?: string | undefined;
  Image?: UrlString | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: IOracleTableRow[] | undefined;
  "Game objects"?: IGameObjectData[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
  Suggestions?: ISuggestions | undefined;
  Attributes?: Attribute[] | undefined;
  Template?: TemplateString | undefined;
}
