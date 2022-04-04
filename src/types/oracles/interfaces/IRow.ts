import type IMultipleRolls from "./IMultipleRolls.js";
import type IRollTemplate from "./IOracleTemplateStrings.js";
import type { PartOfSpeechTag } from "./PartOfSpeechTag.js";
import type { IRowRollYaml } from "./yaml/IRowYaml.js";
import type IAttributeChoices from "../../gameObjects/IAttributeChoices.js";
import type IGameObject from "../../gameObjects/IGameObject.js";
import type ISuggestions from "../../general/interfaces/ISuggestions.js";
import type MdString from "../../general/MdString.js";
import type UrlString from "../../general/UrlString.js";
import type { SettingTruthTableRowId } from "../../truths/ISettingTruthTableRow.js";
import type OracleTableId from "../OracleTableId.js";
import type OracleTableRowId from "../OracleTableRowId.js";

export default interface IRow {
  $id?: SettingTruthTableRowId | OracleTableRowId | undefined | null;
  Floor: IRowRollYaml[0];
  Ceiling: IRowRollYaml[1];
  Result: MdString;
  Summary?: MdString | undefined;
  Description?: MdString | undefined; // use only for the extended descriptions in e.g. setting truths
  Images?: UrlString[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: IRow[] | undefined;
  "Game objects"?: IGameObject[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
  Suggestions?: ISuggestions | undefined;
  Attributes?: IAttributeChoices[] | undefined;
  "Roll template"?: IRollTemplate | undefined;
  "Part of speech"?: PartOfSpeechTag[] | undefined;
}