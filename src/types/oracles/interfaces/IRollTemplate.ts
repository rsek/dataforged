import type { FragmentString, ParagraphsString, SentenceString } from "../../general/StringTypes.js";
import type MdString from "../../general/StringTypes.js";
import type { SettingTruthId } from "../../truths/SettingTruth.js";
import type OracleTableId from "../OracleTableId.js";

/**
 * Represents a template string to be filled with results from specific oracle tables.
 * @date 4/5/2022 - 12:58:15 AM
 *
 * @export
 * @typedef {RollTemplateString}
 */
export type RollTemplateString = MdString & (FragmentString|SentenceString|ParagraphsString) & `${string | ""}\${{${SettingTruthId|OracleTableId | OracleSubtableId }}}${string | ""}`;

/**
 * An ID valid for a subtable embedded in a table Row.
 * @date 4/5/2022 - 12:58:15 AM
 *
 * @export
 * @typedef {OracleSubtableId}
 */
export type OracleSubtableId = `${SettingTruthId|OracleTableId} / ${number}-${number} / Subtable` | `${SettingTruthId|OracleTableId} / ${number} / Subtable`;



/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @date 4/5/2022 - 2:32:56 PM
 *
 * @typedef {RollTemplate}
 * @template T extends string
 */
type RollTemplate<T extends string> = { [P in T|never]?: RollTemplateString | undefined; };

export default RollTemplate;