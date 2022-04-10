import type { IHasDescription, IHasQuestStarter, IRow, RollTemplate } from "../index.js";
import type { SettingTruthId } from "./SettingTruthName";
/**
 * A valid setting truth option ID.
 */
export declare type SettingTruthOptionId = `${SettingTruthId}/${number}` | `${SettingTruthId}/${number}-${number}`;
/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see ISettingTruth
 */
export interface ISettingTruthOption extends Omit<IRow, "$id">, IHasQuestStarter, IHasDescription {
    $id: SettingTruthOptionId;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
}
//# sourceMappingURL=ISettingTruthOption.d.ts.map