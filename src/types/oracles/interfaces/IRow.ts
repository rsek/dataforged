import type IMultipleRolls from "./IMultipleRolls.js";
import type { PartOfSpeechTag } from "./PartOfSpeechTag.js";
import type { IRowRollYaml } from "./yaml/IRowYaml.js";
import type IAttributeChoices from "../../gameObjects/IAttributeChoices";
import type IGameObject from "../../gameObjects/IGameObject.js";
import type ISuggestions from "../../general/interfaces/ISuggestions.js";
import type UrlString from "../../general/UrlString.js";
import type OracleTableId from "../OracleTableId.js";
import type OracleTableRowId from "../OracleTableRowId.js";
import type TemplateString from "../TemplateString.js";

export default interface IRow {
  $id?: OracleTableRowId | undefined | null;
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
  "Part of speech"?: PartOfSpeechTag[] | undefined;
}
