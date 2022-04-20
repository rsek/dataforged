import type { IHasDescription, IHasQuestStarter, IRow, RollTemplate, SettingTruthId } from "../index.js";
/**
 * A valid setting truth option ID.
 * @public
 */
export declare type SettingTruthOptionId = `${SettingTruthId}/${number}-${number}`;
/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 * @public
 */
export interface ISettingTruthOption extends Omit<IRow, "$id" | "Summary">, IHasQuestStarter, IHasDescription {
    $id: SettingTruthOptionId;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
}
//# sourceMappingURL=ISettingTruthOption.d.ts.map