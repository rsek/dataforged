import type { IHasDescription, IHasQuestStarter, IRow, RollTemplate } from "../index.js";
import type { SettingTruthId } from "./SettingTruthName";
export declare type SettingTruthOptionId = `${SettingTruthId} / ${number}` | `${SettingTruthId} / ${number}-${number}`;
export interface ISettingTruthOption extends Omit<IRow, "$id">, IHasQuestStarter, IHasDescription {
    $id: SettingTruthOptionId;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
}
//# sourceMappingURL=ISettingTruthOption.d.ts.map