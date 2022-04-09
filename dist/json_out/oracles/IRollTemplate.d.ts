import type { FragmentString, MdString, OracleTableId, ParagraphsString, SentenceString } from "../index.js";
import type { SettingTruthId } from "../setting_truths/SettingTruthName";
export declare type RollTemplateString = MdString & (FragmentString | SentenceString | ParagraphsString) & `${string | ""}\${{${SettingTruthId | OracleTableId | OracleSubtableId}}}${string | ""}`;
export declare type OracleSubtableId = `${SettingTruthId | OracleTableId} / ${number}-${number} / Subtable` | `${SettingTruthId | OracleTableId} / ${number} / Subtable`;
declare type RollTemplate<T extends string> = {
    [P in T | never]?: RollTemplateString | undefined;
};
export { RollTemplate };
//# sourceMappingURL=IRollTemplate.d.ts.map