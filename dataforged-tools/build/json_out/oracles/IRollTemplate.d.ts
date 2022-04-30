import type { OracleTableId } from "../index.js";
import type { SettingTruthId } from "../truths/index.js";
/**
 * Represents a template string to be filled with results from specific oracle tables.
 * @internal
 * @asType string
 */
export declare type RollTemplateString = `${string | ""}\${{${SettingTruthId | OracleTableId | OracleSubtableId}}}${string | ""}`;
/**
 * An ID valid for a subtable embedded in a table Row.
 * @internal
 * @asType string
 */
export declare type OracleSubtableId = `${SettingTruthId | OracleTableId}/${number}-${number}/Subtable` | `${SettingTruthId | OracleTableId}/${number}/Subtable`;
/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
export declare type RollTemplate<T extends string> = {
    [P in T | never]?: string | undefined;
};
//# sourceMappingURL=IRollTemplate.d.ts.map