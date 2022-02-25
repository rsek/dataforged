import AttributeHash from "../../gameobjects/AttributeHash";
import GameObjectData from "../../gameobjects/GameObjectData";
import ISuggestionsData from "../../general/interfaces/ISuggestionsData";
import UrlString from "../../general/UrlString";
import TemplateString from "../TemplateString";
import IMultipleRolls from "./IMultipleRolls";
import IOracleTableRow from "./IOracleTableRow";


export type IRowRollData = [number | null, number | null];
export type IRowContentItem = object | string;
export type IRowContentData = IRowContentItem[];
export type IRowData = [...IRowRollData, ...IRowContentData];
export default IRowData;

// interface IRowDataObject {
//   Result?: IOracleTableRow["Result"] | undefined;
//   Summary?: IOracleTableRow["Summary"] | undefined;
//   Subtable?: IRowData[] | undefined;
//   // "Game objects"?: GameObjectData[] | undefined;
//   "Multiple rolls"?: IMultipleRolls | undefined;
//   "Suggestions"?: ISuggestionsData | undefined;
//   // Attributes?: AttributeHash | undefined;
//   // Template?: TemplateString | undefined;
// }