import IMultipleRolls from "./IMultipleRolls";
import OracleTableId from "../OracleTableId";
import OracleTableRowId from "../OracleTableRowId";
import UrlString from "../../general/UrlString";
import TemplateString from "../TemplateString";
import IAttributeChoices from "../../gameObjects/IAttributeChoices";
import ISuggestions from "../../general/interfaces/ISuggestions";
import IGameObject from "../../gameObjects/IGameObject";
import { IRowRollYaml } from "./yaml/IRowYaml";

export default interface IRow {
  $id?: OracleTableRowId | undefined;
  Floor: IRowRollYaml[0];
  Ceiling: IRowRollYaml[1];
  Result: string;
  Summary?: string | undefined;
  Images?: UrlString[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: IRow[] | undefined;
  "Game objects"?: IGameObject[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
  Suggestions?: ISuggestions | undefined;
  Attributes?: IAttributeChoices[] | undefined;
  Template?: TemplateString | undefined;
}
