import type { IHasDescription, IHasQuestStarter, IRow, RollTemplate } from "../index.js";
import type { SettingTruthOptionId } from "./SettingTruthOptionId.js";
/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 */
export interface ISettingTruthOption extends Omit<IRow, "$id" | "Summary">, IHasQuestStarter, IHasDescription {
    $id: SettingTruthOptionId;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
}
//# sourceMappingURL=ISettingTruthOption.d.ts.map