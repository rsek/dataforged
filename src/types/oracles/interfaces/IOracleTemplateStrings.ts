import type MdString from "../../general/MdString.js";
import type { SettingTruthId } from "../../truths/SettingTruth.js";
import type OracleTableId from "../OracleTableId.js";

export type RollTemplateString = MdString & `${string | ""}\${{${SettingTruthId|OracleTableId | OracleSubtableId }}}${string | ""}`;

export type OracleSubtableId = `${SettingTruthId|OracleTableId} / ${number}-${number} / Subtable` | `${SettingTruthId|OracleTableId} / ${number} / Subtable`;



export default interface IRollTemplate {
  Result?: RollTemplateString;
  Summary?: RollTemplateString;
  Description?: RollTemplateString;
}
