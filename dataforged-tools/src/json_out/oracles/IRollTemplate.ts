import type { OracleTableId } from "@json_out/index.js";
import type { SettingTruthId } from "@json_out/truths/index.js";

/**
 * Represents a template string to be filled with results from specific oracle tables.
 * @public
 */
export type RollTemplateString = `${string | ""}\${{${SettingTruthId|OracleTableId | OracleSubtableId }}}${string | ""}`;

/**
 * An ID valid for a subtable embedded in a table Row.
 * @public
 */
export type OracleSubtableId = `${SettingTruthId|OracleTableId}/${number}-${number}/Subtable` | `${SettingTruthId|OracleTableId}/${number}/Subtable`;

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
type RollTemplate<T extends string> = { [P in T|never]?: RollTemplateString | undefined; };

export { RollTemplate };