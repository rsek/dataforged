import type { SettingTruthId } from "@dataforged/classes/setting_truths/SettingTruth.js";
import type { FragmentString, ParagraphsString, SentenceString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { MdString } from "@dataforged/interfaces/json_out/common/strings/MdString.js";
import type { OracleTableId } from "@dataforged/interfaces/json_out/index.js";

/**
 * Represents a template string to be filled with results from specific oracle tables.
 *
 */
export type RollTemplateString = MdString & (FragmentString|SentenceString|ParagraphsString) & `${string | ""}\${{${SettingTruthId|OracleTableId | OracleSubtableId }}}${string | ""}`;

/**
 * An ID valid for a subtable embedded in a table Row.
 *
 */
export type OracleSubtableId = `${SettingTruthId|OracleTableId} / ${number}-${number} / Subtable` | `${SettingTruthId|OracleTableId} / ${number} / Subtable`;

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 *
 */
type RollTemplate<T extends string> = { [P in T|never]?: RollTemplateString | undefined; };

export { RollTemplate };